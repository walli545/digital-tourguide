package edu.hm.digitaltourguide.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolylineOptions
import com.google.maps.android.PolyUtil
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.RoutePreviewAdapter
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import java.math.BigDecimal

class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel
    private lateinit var adapter: RoutePreviewAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)
        val root = inflater.inflate(R.layout.fragment_home, container, false)

        val recyclerView: RecyclerView = root.findViewById(R.id.home_last_recycler)
        adapter = RoutePreviewAdapter(
            listOf(getLastRoute())
        )
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        return root
    }

    private fun getLastRoute(): Route {
        val pois = listOf(
            PointOfInterest(
                "1",
                "Kirchsee",
                "",
                BigDecimal(47.8189),
                BigDecimal(11.6180),
                BigDecimal(0),
                0,
                ""

            ),
            PointOfInterest(
                "2",
                "Besserer Kirchsee",
                "",
                BigDecimal(47.8235),
                BigDecimal(11.6345),
                BigDecimal(0),
                0,
                ""
            ),
            PointOfInterest(
                "2",
                "Bester Kirchsee",
                "",
                BigDecimal(47.8199),
                BigDecimal(11.6045),
                BigDecimal(0),
                0,
                ""
            )
        )

        val lats = mutableListOf<LatLng>()
        pois.forEach {
            val coordinates = LatLng(
                it.latitude.toDouble(),
                it.longitude.toDouble()
            )
            lats.add(coordinates)
        }

        return Route(
                "0",
                pois,
                "TestTour",
                "",
                "",
                1.0f,
                PolyUtil.encode(lats)
            )
    }
}