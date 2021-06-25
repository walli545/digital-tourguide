package edu.hm.digitaltourguide.ui.tourList

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.NavHostFragment
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.infrastructure.ApiClient
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourListBinding
import java.util.*

/**
 * A fragment representing a list of Items.
 */
class TourListFragment : Fragment() {

    private lateinit var binding: FragmentTourListBinding
    private lateinit var recipeListViewModel: TourListViewModel
    private lateinit var listener: TourItemListener
    private lateinit var tourAdapter: MyTourRecyclerViewAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_tour_list, container, false)

        recipeListViewModel = ViewModelProvider(
            this).get(TourListViewModel::class.java)

        try {
            val list: Array<Route> = recipeListViewModel.getAllRoutes()
            for (e in list){
                e.toString()
            }
            val listFirst = list.first()
            listener = TourItemListener(this)
            tourAdapter = activity?.let { MyTourRecyclerViewAdapter(list.asList(), it, listener) }!!
            binding.tourList.adapter = tourAdapter
        }catch (e: java.lang.Exception){
            Toast.makeText(this.context, "Loggen Sie sich ein, um Routen abzurufen!", Toast.LENGTH_LONG).show()
        }
        return binding.root
    }
}

class TourItemListener(val fragment: Fragment){
    fun onClick(route: Route){
        val action = TourListFragmentDirections.actionTourListFragmentToTourDetailFragment(route)
        NavHostFragment.findNavController(fragment).navigate(action)
    }
}