package edu.hm.digitaltourguide.ui.promotedMap

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.NavHostFragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.material.switchmaterial.SwitchMaterial
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.infrastructure.ClientException
import edu.hm.digitaltourguide.ui.tour.TourDetailFragmentDirections


class PromotedMapFragment : Fragment() {

    private lateinit var promotedMapViewModel: PromotedMapViewModel
    private lateinit var map: GoogleMap

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

        try {

            map = googleMap
            toggleMapType()

            val promotedPoIs = promotedMapViewModel.getAllPromotedPoIs()
            val camPosLat = emptyList<Double>().toMutableList()
            val camPosLng = emptyList<Double>().toMutableList()

            for (poi in promotedPoIs) {
                camPosLat.add(poi.latitude)
                camPosLng.add(poi.longitude)
                googleMap.addMarker(
                    MarkerOptions().position(LatLng(poi.latitude, poi.longitude)).title(poi.name).icon(
                        BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_VIOLET))
                )
            }

            if (!camPosLat.isNullOrEmpty() && !camPosLng.isNullOrEmpty()) {

                val latLng =
                    LatLng(camPosLat.sum() / camPosLat.size, camPosLng.sum() / camPosLng.size)
                googleMap.moveCamera(CameraUpdateFactory.newLatLng(latLng))

                googleMap.animateCamera(
                    CameraUpdateFactory.newLatLngZoom(
                        latLng, 10.0f
                    ), 1000, null
                );
            }

            googleMap.setOnInfoWindowClickListener (GoogleMap.OnInfoWindowClickListener { marker -> // on marker click we are getting the title of our marker
                // which is clicked and displaying it in a toast message.

                val action = PromotedMapFragmentDirections.actionNavMapsToPoiFragment(promotedPoIs.first{it.name.equals(marker.title)})
                NavHostFragment.findNavController(this).navigate(action)
                false
            })

        }catch (e: ClientException) {
            Toast.makeText(
                this.context,
                "Log in to request promoted pois!",
                Toast.LENGTH_LONG
            ).show()
        }catch (e: Exception) {}
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        promotedMapViewModel =
            ViewModelProvider(this).get(PromotedMapViewModel::class.java)

        val view = inflater.inflate(R.layout.fragment_promoted_map, container, false)
        view.findViewById<SwitchMaterial>(R.id.preview_satellite_switch).setOnClickListener {
            toggleMapType()
        }

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment = childFragmentManager.findFragmentById(R.id.map) as SupportMapFragment?
        mapFragment?.getMapAsync(callback)
    }

    private fun toggleMapType() {
        if (requireView().findViewById<SwitchMaterial>(R.id.preview_satellite_switch).isChecked) {
            map.mapType = GoogleMap.MAP_TYPE_SATELLITE
        } else {
            map.mapType = GoogleMap.MAP_TYPE_NORMAL
        }
    }
}
