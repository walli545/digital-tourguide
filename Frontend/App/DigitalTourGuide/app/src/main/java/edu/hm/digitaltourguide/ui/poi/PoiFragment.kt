package edu.hm.digitaltourguide.ui.poi

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.bumptech.glide.Glide
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.databinding.FragmentPoiBinding


class PoiFragment : Fragment() {

    //private lateinit var ratingAdapter: PoiListAdapter
    private lateinit var binding: FragmentPoiBinding
    private lateinit var poi: PointOfInterest

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val args = PoiFragmentArgs.fromBundle(requireArguments())
        poi = args.poi

        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_poi, container, false)

        val imageSlider = binding.tripImageSlider
        //val poiList = binding.poiListRecycler
        val descriptionText = binding.poiDescription
        val rating = binding.ratingBar

        (requireActivity() as AppCompatActivity).supportActionBar?.title = poi.name

        // Initialize and assign Adapter to PoiList RecyclerView
//        poiListAdapter = activity?.let { PoiListAdapter(it, route.pointOfInterests!!) }!!;
//        poiList.adapter = poiListAdapter
//        poiList.layoutManager = LinearLayoutManager(context)
        descriptionText.text = poi.description

        // Route Poi Pictures
        val slideModels = arrayListOf<SlideModel>()
        if (!poi.imageUrl.isNullOrEmpty()){
            slideModels.add(SlideModel(poi.imageUrl, ""))
        }
        imageSlider.setImageList(slideModels, true)

        var urlStaticMap = "https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=1000x300&maptype=hybrid&markers=color:red|"+ poi.latitude + "," + poi.longitude + "&key=" + BuildConfig.API_KEY

        context?.let {
            Glide.with(it)
                .load(urlStaticMap)
                .into(binding.poiPreviewImage)
        }

        rating.rating = poi.averageRating.toFloat()

        return binding.root
    }
}