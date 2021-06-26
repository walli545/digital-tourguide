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
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.RoutePreviewAdapter
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import java.math.BigDecimal
import java.util.*

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
            listOf(
                Route(
                    UUID.randomUUID(),
                    "TestTour",
                    "",
                    "",
                    1.0f,
                    "",
                    3.5,
                    2,
                    arrayOf(
                        PointOfInterest(
                            UUID.randomUUID(),
                            "Kirchsee",
                            "",
                            "Wunderschöner Kirchsee",
                            47.8189,
                            11.6180,
                            0.5,
                            0,
                            "",
                            false

                        ),
                        PointOfInterest(
                            UUID.randomUUID(),
                            "Besserer Kirchsee",
                            "",
                            "Wunderschöner Kirchsee",
                            47.8235,
                            11.6345,
                            0.5,
                            0,
                            "",
                            true
                        ),
                        PointOfInterest(
                            UUID.randomUUID(),
                            "Bester Kirchsee",
                            "",
                            "Wunderschöner Kirchsee",
                            47.8199,
                            11.6045,
                            0.5,
                            0,
                            "",
                            true
                        )
                ),
                )
            )
        )
        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        return root
    }
}