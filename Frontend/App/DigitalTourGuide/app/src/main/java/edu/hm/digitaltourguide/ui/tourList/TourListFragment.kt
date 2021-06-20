package edu.hm.digitaltourguide.ui.tourList

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.lifecycle.ViewModelProvider
import edu.hm.digitaltourguide.R
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

        val list: List<Route> = listOf(Route(UUID.randomUUID(), "Route1", "Das ist eine Test Route", "Tobias", 1.0f, "", listOf<PointOfInterest>(PointOfInterest(UUID.randomUUID(), "Poi1", "Test POI", 12.2323, 32.2332,2.4,2,"https://upload.wikimedia.org/wikipedia/commons/0/0c/Kirchsee_in_der_Abendsonne.jpg"))))

        listener = TourItemListener(this)
        tourAdapter = activity?.let { MyTourRecyclerViewAdapter(list, it, listener) }!!
        binding.tourList.adapter = tourAdapter

//        val dataSource = RecipeDatabase.getInstance(requireActivity().applicationContext).recipeDatabaseDao
//        val viewModelFactory = RecipeListViewModelFactory(dataSource)
//        recipeListViewModel = ViewModelProvider(
//            this, viewModelFactory).get(RecipeListViewModel::class.java)

        return binding.root
    }
}

class TourItemListener(val fragment: Fragment){
    fun onClick(route: Route){
        //val action = RecipeListFragmentDirections.actionRecipeListFragmentToRecipeViewFragment(route)

        //NavHostFragment.findNavController(fragment).navigate(action)
    }
}