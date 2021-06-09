package edu.hm.digitaltourguide.ui.preview

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.Route

class TourPreviewFragment : Fragment() {

    private lateinit var route : Route

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
        val kirchsee = LatLng(47.8189, 11.6180)
        googleMap.addMarker(MarkerOptions().position(kirchsee).title("Marker at Kirchsee"))
        googleMap.moveCamera(CameraUpdateFactory.newLatLng(kirchsee))
        googleMap.animateCamera(
            CameraUpdateFactory.newLatLngZoom(
                kirchsee, 12.0f
            ),1000, null
        );
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val bundle = TourPreviewFragmentArgs.fromBundle(savedInstanceState!!)

        val tourID = bundle.tourID;

        // TODO get tour from backend

        return inflater.inflate(R.layout.fragment_tour_preview, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val mapFragment = childFragmentManager.findFragmentById(R.id.preview_map) as SupportMapFragment?
        mapFragment?.getMapAsync(callback)
    }

}