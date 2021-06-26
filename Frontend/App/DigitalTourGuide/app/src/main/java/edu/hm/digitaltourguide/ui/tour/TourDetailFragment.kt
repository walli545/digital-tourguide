package edu.hm.digitaltourguide.ui.tour

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.RatingBar
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.NavHostFragment
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourDetailBinding
import edu.hm.digitaltourguide.ui.poi.SwipeToDeleteCallback
import edu.hm.digitaltourguide.ui.tourList.TourItemListener

class TourDetailFragment : Fragment() {

    private lateinit var tourDetailViewModel: TourDetailViewModel
    private lateinit var poiListAdapter: PoiListAdapter
    private lateinit var binding: FragmentTourDetailBinding
    private lateinit var listener: PoiItemListener
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
        val rating = binding.ratingBar
        val rateBtn = binding.rateRouteBtn

        (requireActivity() as AppCompatActivity).supportActionBar?.title = route.name

        // Initialize and assign Adapter to PoiList RecyclerView
        listener = PoiItemListener(this)
        poiListAdapter = activity?.let { PoiListAdapter(route.pointOfInterests!!, it, listener) }!!;
        poiList.adapter = poiListAdapter
        poiList.layoutManager = LinearLayoutManager(context)
        descriptionText.text = route.description

        // Route Poi Pictures
        val slideModels = arrayListOf<SlideModel>()
        var poiLocationsString = ""
        for (poi in route.pointOfInterests!!){
            slideModels.add(SlideModel(poi.imageUrl, poi.name))
            poiLocationsString += "|" + poi.latitude.toString() + "," + poi.longitude.toString()
        }
        imageSlider.setImageList(slideModels, true)

        val urlStaticMap = "https://maps.googleapis.com/maps/api/staticmap?size=1000x300&path=enc:"+ route.polyline + "&markers=color:red|"+ poiLocationsString + "&key=" + BuildConfig.API_KEY


        context?.let {
            Glide.with(it)
                .load(urlStaticMap)
                .into(binding.tourPreviewImage)
        }

//        rating.rating = route.averageRating.toFloat()
//
//        val swipeDeleteHandler = object : SwipeToDeleteCallback(context) {
//            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
//                AlertDialog.Builder(context!!)
//                    .setTitle("Delete review")
//                    .setMessage("Are you sure you want to delete this review?")
//                    .setPositiveButton(
//                        android.R.string.yes
//                    ) { dialog, which ->
//                        //                val item = ratingListAdapter.ratingList[viewHolder.adapterPosition]
//                        //                API.deleteRating(item)
//                        // Continue with delete operation
//                    } // A null listener allows the button to dismiss the dialog and take no further action.
//                    .setNegativeButton(android.R.string.no, null)
//                    .setIcon(R.drawable.ic_delete_purple_24)
//                    .show()
//                ratingListAdapter.notifyDataSetChanged()
//            }
//        }
//
//        val role = MainActivity.preferences.getString("ROLE", null)
//        if (role != null && role == "moderator"){
//            val itemTouchHelperDelete = ItemTouchHelper(swipeDeleteHandler)
//            itemTouchHelperDelete.attachToRecyclerView(ratingList)
//        }
//
//        rateBtn.setOnClickListener{
//            openAddPoiReviewDialog()
//        }

        return binding.root
    }

    /**
     * Method to add a tour review
     */
    private fun openAddTourReviewDialog(){
        val d = AlertDialog.Builder(requireContext())
        val inflater = this.layoutInflater
        val dialogView = inflater.inflate(R.layout.poi_dialog_rating, null)
        d.setTitle("Tour bewerten")
        d.setView(dialogView)
        val ratingBar = dialogView.findViewById<RatingBar>(R.id.review_ratingBar)
        val comment = dialogView.findViewById<EditText>(R.id.review_comment)

        d.setPositiveButton("Done") { _, _ ->
            // TODO
            ratingBar.numStars.toDouble()
            comment.text.toString()
            Toast.makeText(requireContext(), "Bewertung erfolgreich abgegeben", Toast.LENGTH_LONG).show()
        }
        d.setNegativeButton("Cancel") { _, _ -> }
        val alertDialog = d.create()
        alertDialog.show()
    }
}

class PoiItemListener(val fragment: Fragment){
    fun onClick(poi: PointOfInterest){
        val action = TourDetailFragmentDirections.actionTourDetailFragmentToPoiFragment(poi)
        NavHostFragment.findNavController(fragment).navigate(action)
    }
}