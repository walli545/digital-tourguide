package edu.hm.digitaltourguide.ui.preview

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.NavHostFragment
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolylineOptions
import com.google.android.material.switchmaterial.SwitchMaterial
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.ui.promotedMap.PromotedMapFragmentDirections
import edu.hm.digitaltourguide.ui.promotedMap.PromotedMapViewModel

class TourPreviewFragment : Fragment() {

    private val NEXT_POI = "next_poi"

    private var locationPermissionGranted: Boolean = false
    private val PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1

    private lateinit var route: Route
    private lateinit var map: GoogleMap
    private lateinit var promotedMapViewModel: PromotedMapViewModel

    private var satelliteView = false
    private var nextPoI = 0

    private val callback = OnMapReadyCallback { googleMap ->
        /**
         * Manipulates the map once available.
         * This callback is triggered when the map is ready to be used.
         * This is where we can add markers or lines, add listeners or move the camera.
         * In this case, we just add a marker near Sydney, Australia.
         * If Google Play services is not installed on the device, the user will be prompted to
         * install it inside the SupportMapFragment. This method will only be triggered once the
         * user has installed Google Play services and returned to the app.
         */

        MapsInitializer.initialize(requireContext())
        map = googleMap
        route.pointOfInterests?.let { setLocation(it) }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val bundle = TourPreviewFragmentArgs.fromBundle(requireArguments())

        route = bundle.route
        (requireActivity() as AppCompatActivity).supportActionBar?.title = route.name

        promotedMapViewModel =
            ViewModelProvider(this).get(PromotedMapViewModel::class.java)

        getLocationPermission()

        if (savedInstanceState != null) {
            nextPoI = savedInstanceState.getInt(NEXT_POI)
        }

        val view = inflater.inflate(R.layout.fragment_tour_preview, container, false)
        view.findViewById<Button>(R.id.start_tour_button).setOnClickListener {
            startNavigation()
        }

        view.findViewById<SwitchMaterial>(R.id.preview_satellite_switch).setOnClickListener {
            toggleMapType()
        }

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment =
            childFragmentManager.findFragmentById(R.id.preview_map) as SupportMapFragment?
        mapFragment?.getMapAsync(callback)
    }

    override fun onResume() {
        super.onResume()
        if (this::map.isInitialized) {
            map.clear()
            route.pointOfInterests?.let { setLocation(it) }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putInt(NEXT_POI, nextPoI)
    }

    @SuppressLint("MissingPermission")
    private fun setLocation(pointOfInterests: Array<PointOfInterest>) {
        if (!::map.isInitialized) return
        with(map) {
            mapType = GoogleMap.MAP_TYPE_NORMAL
            setOnMapClickListener {

            }

            if (locationPermissionGranted) {
                map.isMyLocationEnabled = true
            }

            val lats = mutableListOf<LatLng>()

            pointOfInterests.forEach {
                val coordinates = LatLng(
                    it.latitude,
                    it.longitude
                )
                lats.add(coordinates)
                addMarker(
                    MarkerOptions()
                        .position(coordinates)
                        .title(it.name)
                )
            }
            addMarker(
                MarkerOptions()
                    .title(pointOfInterests[nextPoI].name)
                    .position(lats[nextPoI])
                    .icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ORANGE))
            )

            moveCamera(CameraUpdateFactory.newLatLngZoom(lats[nextPoI], 12f))
            addPolyline(
                PolylineOptions()
                    .addAll(com.google.maps.android.PolyUtil.decode(route.polyline))

            )

            val promotedPoIs = promotedMapViewModel.getAllPromotedPoIs()
            for (poi in promotedPoIs) {
                addMarker(
                    MarkerOptions().position(LatLng(poi.latitude, poi.longitude)).title(poi.name)
                )
            }
        }
    }

    private fun startNavigation() {
        val poi = route.pointOfInterests!![nextPoI]
        if (route.pointOfInterests!!.size > (nextPoI + 1)) {
            nextPoI++
        }

        val gmmIntentUri =
            Uri.parse(
                String.format(
                    "google.navigation:q=%s,%s&mode=w",
                    poi.latitude.toString(),
                    poi.longitude.toString()
                )
            )
        val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
        mapIntent.setPackage("com.google.android.apps.maps")
        startActivity(mapIntent)
    }

    private fun getLocationPermission() {
        /*
         * Request location permission, so that we can get the location of the
         * device. The result of the permission request is handled by a callback,
         * onRequestPermissionsResult.
         */
        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            )
            == PackageManager.PERMISSION_GRANTED
        ) {
            locationPermissionGranted = true
        } else {
            ActivityCompat.requestPermissions(
                requireActivity(), arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION
            )
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        locationPermissionGranted = false
        when (requestCode) {
            PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION -> {

                // If request is cancelled, the result arrays are empty.
                if (grantResults.isNotEmpty() &&
                    grantResults[0] == PackageManager.PERMISSION_GRANTED
                ) {
                    locationPermissionGranted = true
                }
            }
        }
        if (::map.isInitialized) {
            route.pointOfInterests?.let { setLocation(it) }
        }
    }

    private fun toggleMapType() {
        satelliteView = !satelliteView
        if (satelliteView) {
            map.mapType = GoogleMap.MAP_TYPE_SATELLITE
        } else {
            map.mapType = GoogleMap.MAP_TYPE_NORMAL
        }
    }
}