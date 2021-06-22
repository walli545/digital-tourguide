package edu.hm.digitaltourguide.ui.tour

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourDetailBinding
import java.util.*


class TourDetailFragment : Fragment() {

    private lateinit var tourDetailViewModel: TourDetailViewModel
    private lateinit var poiListAdapter: PoiListAdapter
    private lateinit var binding: FragmentTourDetailBinding
    private lateinit var route: Route

    // Demo POI Information
    val poiTitleList =
        arrayOf("St. Marienkirche", "Zionskirche", "Kirche am Südstern", "St. Johanniskirche")
    val poiImageList = arrayOf(
        "https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg",
        "https://www.h-hotels.com/_Resources/Persistent/3b16ed74d9a4b7a5bfb7cb1ca631bec93d49375f/berlin-nikolaikirche-01-2400x1351-1356x763.jpg",
        "https://evkirche-luckenwalde.de/gra/johportal.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Johanneskirche_%28Berlin-Lichterfelde%29.jpg"
    )

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

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
        for (poi in route.pointOfInterests!!) {
            slideModels.add(SlideModel(poi.imageUrl, poi.name))
        }
        imageSlider.setImageList(slideModels, true)

        // Demo description text
        descriptionText.text =
            "Eine Tour, welche die besten und schönsten Kirchen der Stadt besucht."

        var urlStaticMap =
            "https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=" + route.polyline + "&key=AIzaSyAiZcSKHkU0fDADhteoQJJzkdXQfvnCHnQ"

        context?.let {
            Glide.with(it)
                .load(urlStaticMap)
                .into(binding.tourPreviewImage)
        }

        binding.startTourIcon.setOnClickListener {
            // TODO get route UUID
            findNavController().navigate(
                TourDetailFragmentDirections.actionTourDetailFragmentToTourPreviewFragment(
                    route
                )
            )
        }

        return binding.root
    }
}