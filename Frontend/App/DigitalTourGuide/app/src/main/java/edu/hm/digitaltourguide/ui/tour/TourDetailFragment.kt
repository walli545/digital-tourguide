package edu.hm.digitaltourguide.ui.tour

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourDetailBinding
import edu.hm.digitaltourguide.ui.home.HomeViewModel
import edu.hm.digitaltourguide.ui.tour.PoiListAdapter


class TourDetailFragment : Fragment() {

    private lateinit var tourDetailViewModel: TourDetailViewModel
    private lateinit var poiListAdapter: PoiListAdapter
    private lateinit var binding: FragmentTourDetailBinding
    private lateinit var route: Route

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        val args = TourDetailFragmentArgs.fromBundle(requireArguments())
        route = args.route

        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_tour_detail, container, false)

        tourDetailViewModel =
            ViewModelProvider(this).get(TourDetailViewModel::class.java)

        val imageSlider = binding.tripImageSlider
        val poiList = binding.poiListRecycler
        val descriptionText = binding.tourDescription

        (requireActivity() as AppCompatActivity).supportActionBar?.title = route.name

        // Initialize and assign Adapter to PoiList RecyclerView
        poiListAdapter = activity?.let { PoiListAdapter(it, route.pointOfInterests!!) }!!;
        poiList.adapter = poiListAdapter
        poiList.layoutManager = LinearLayoutManager(context)
        descriptionText.text = route.description

        // Route Poi Pictures
        val slideModels = arrayListOf<SlideModel>()
        for (poi in route.pointOfInterests!!){
            slideModels.add(SlideModel(poi.imageUrl, poi.name))
        }
        imageSlider.setImageList(slideModels, true)

        var urlStaticMap = "https://maps.googleapis.com/maps/api/staticmap?size=1000x300&path="+ route.polyline +"&key=AIzaSyAiZcSKHkU0fDADhteoQJJzkdXQfvnCHnQ"

        context?.let {
            Glide.with(it)
                .load(urlStaticMap)
                .into(binding.tourPreviewImage)
        }


        return binding.root
    }
}