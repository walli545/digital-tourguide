package edu.hm.digitaltourguide.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.lifecycle.SavedStateViewModelFactory
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
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
            ViewModelProvider(
                requireActivity()
            ).get(HomeViewModel::class.java)

        val root = inflater.inflate(R.layout.fragment_home, container, false)

        val recyclerView: RecyclerView = root.findViewById(R.id.home_last_recycler)
        adapter = RoutePreviewAdapter(listOf())

        homeViewModel.lastTour.observe(viewLifecycleOwner, {
            if (it != null) {
                adapter.routes = listOf(it)
            }
        })

        recyclerView.adapter = adapter
        recyclerView.layoutManager = LinearLayoutManager(context)

        root.findViewById<Button>(R.id.home_select_tour_button).setOnClickListener {
            findNavController().navigate(HomeFragmentDirections.actionNavHomeToTourListFragment())
        }

        return root
    }

    override fun onSaveInstanceState(outState: Bundle) {
        if (this::homeViewModel.isInitialized) {
            homeViewModel.saveState()
        }
        super.onSaveInstanceState(outState)
    }
}