package edu.hm.digitaltourguide

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.databinding.FragmentTourDetailBinding
import edu.hm.digitaltourguide.ui.trip.PoiListAdapter


class TourDetailFragment : Fragment() {

    private lateinit var poiListAdapter: PoiListAdapter

    // Demo POI Information
    val poiTitleList = arrayOf("St. Marienkirche","Zionskirche","Kirche am Südstern","St. Johanniskirche")
    val poiImageList = arrayOf("https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg",
        "https://www.h-hotels.com/_Resources/Persistent/3b16ed74d9a4b7a5bfb7cb1ca631bec93d49375f/berlin-nikolaikirche-01-2400x1351-1356x763.jpg",
        "https://evkirche-luckenwalde.de/gra/johportal.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/b/bf/Johanneskirche_%28Berlin-Lichterfelde%29.jpg")

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {

        val binding: FragmentTourDetailBinding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_tour_detail, container, false)

        val imageSlider = binding.tripImageSlider
        val poiList = binding.poiListRecycler
        val descriptionText = binding.tourDescription

        // Demo Trip Pictures
        val slideModels = arrayListOf<SlideModel>()
        slideModels.add(SlideModel("https://www.h-hotels.com/_Resources/Persistent/5a7e839511d272d52470d6f8cd1aed90527a691b/berlin-skyview-museumsinsel-01-2660x1990.jpg", "Berliner Dom"))
        slideModels.add(SlideModel("https://www.h-hotels.com/_Resources/Persistent/3b16ed74d9a4b7a5bfb7cb1ca631bec93d49375f/berlin-nikolaikirche-01-2400x1351-1356x763.jpg", "Nikolaikirche"))
        slideModels.add(SlideModel("https://www.h-hotels.com/_Resources/Persistent/f78f89d219799c6ae2cdc939ba244bcff5d7a594/berlin-sankt-hedwigs-kathedrale-01-2400x1799-1356x1016.jpg", "St.-Hedwigs-Kathedrale"))
        imageSlider.setImageList(slideModels, true)
        (requireActivity() as AppCompatActivity).supportActionBar?.title = "Berliner Kirchen"

        // Initialize and assign Adapter to PoiList RecyclerView
        poiListAdapter = activity?.let { PoiListAdapter(it, poiTitleList, poiImageList) }!!;
        poiList.adapter = poiListAdapter
        poiList.layoutManager = LinearLayoutManager(context)

        // Demo description text
        descriptionText.text = "Eine Tour welche die besten und schönsten Kirchen der Stadt besucht."

        return binding.root
    }
}