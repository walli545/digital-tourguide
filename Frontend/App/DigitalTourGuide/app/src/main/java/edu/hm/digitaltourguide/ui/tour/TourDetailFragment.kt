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
import androidx.core.view.isVisible
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
import edu.hm.digitaltourguide.api.infrastructure.ClientException
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.PostRouteReview
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourDetailBinding
import edu.hm.digitaltourguide.ui.poi.SwipeToDeleteCallback
import edu.hm.digitaltourguide.ui.tourList.TourItemListener
import androidx.navigation.fragment.findNavController
import edu.hm.digitaltourguide.ui.tourList.RatingListAdapter
import java.lang.Exception

class TourDetailFragment : Fragment() {

    private lateinit var ratingListAdapter: RatingListAdapter
    private lateinit var tourDetailViewModel: TourDetailViewModel
    private lateinit var poiListAdapter: PoiListAdapter
    private lateinit var binding: FragmentTourDetailBinding
    private lateinit var listener: PoiItemListener
    private lateinit var route: Route
    private lateinit var rating: RatingBar

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        tourDetailViewModel =
            ViewModelProvider(this).get(TourDetailViewModel::class.java)

        val args = TourDetailFragmentArgs.fromBundle(requireArguments())

        try {
            route = tourDetailViewModel.getRoute(args.route.routeId)
        }catch (e: ClientException){
            Toast.makeText(this.context, "Log in to request the tour!", Toast.LENGTH_LONG).show()
        }catch (e: Exception){
            Toast.makeText(this.context, "Error requesting the tour!", Toast.LENGTH_LONG).show()
        }

        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_tour_detail, container, false)



        val imageSlider = binding.tripImageSlider
        val poiList = binding.poiListRecycler
        val descriptionText = binding.tourDescription
        rating = binding.ratingBar
        val rateBtn = binding.rateRouteBtn
        val ratingList = binding.ratingRecycler
        val duration = binding.duration

        (requireActivity() as AppCompatActivity).supportActionBar?.title = route.name

        // Initialize and assign Adapter to PoiList RecyclerView
        listener = PoiItemListener(this)
        poiListAdapter = activity?.let { PoiListAdapter(route.pointOfInterests!!.asList(), it, listener) }!!
        poiList.adapter = poiListAdapter
        poiList.layoutManager = LinearLayoutManager(context)
        val reviews = tourDetailViewModel.getReviews(route.routeId)
        ratingListAdapter = RatingListAdapter(reviews.asList())
        ratingList.adapter = ratingListAdapter
        ratingList.layoutManager = LinearLayoutManager(context)
        descriptionText.text = route.description
        duration.text = route.duration.toString() + " h"

        // Route Poi Pictures
        val slideModels = arrayListOf<SlideModel>()
        var poiLocationsString = ""
        for (poi in route.pointOfInterests!!) {
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

        binding.tourPreviewImage.setOnClickListener {
            findNavController().navigate(
                TourDetailFragmentDirections.actionTourDetailFragmentToTourPreviewFragment(
                    route
                )
            )
        }

        rating.rating = route.averageRating.toFloat()

        val swipeDeleteHandler = object : SwipeToDeleteCallback(context) {
            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                AlertDialog.Builder(context!!)
                    .setTitle("Delete review")
                    .setMessage("Are you sure you want to delete this review?")
                    .setPositiveButton(
                        android.R.string.yes
                    ) { dialog, which ->
                        val review = ratingListAdapter.reviewList[viewHolder.adapterPosition]
                        try {
                            tourDetailViewModel.deleteReview(reviewID = review.routeReviewId)
                        }catch (e: Exception){
                            Toast.makeText(requireContext(), "Error deleting the review!", Toast.LENGTH_LONG).show()
                        }
                        updateRoute()

                    } // A null listener allows the button to dismiss the dialog and take no further action.
                    .setNegativeButton(android.R.string.no, null)
                    .setIcon(R.drawable.ic_delete_purple_24)
                    .show()
                ratingListAdapter.notifyDataSetChanged()
            }
        }

        val role = MainActivity.preferences.getStringSet("ROLES", null)
        if (role != null && role.contains("moderator")){
            val itemTouchHelperDelete = ItemTouchHelper(swipeDeleteHandler)
            itemTouchHelperDelete.attachToRecyclerView(ratingList)
            rateBtn.isVisible = false
        }

        rateBtn.setOnClickListener{
            openAddRouteReviewDialog()
        }

        return binding.root
    }

    /**
     * Method to add a tour review
     */
    private fun openAddRouteReviewDialog(){
        val d = AlertDialog.Builder(requireContext())
        val inflater = this.layoutInflater
        val dialogView = inflater.inflate(R.layout.poi_dialog_rating, null)
        d.setTitle("Tour review")
        d.setView(dialogView)
        val ratingBar = dialogView.findViewById<RatingBar>(R.id.review_ratingBar)
        val comment = dialogView.findViewById<EditText>(R.id.review_comment)

        d.setPositiveButton("Done") { _, _ ->

            try {
                val review = PostRouteReview(  routeID = route.routeId, content = comment.text.toString(), rating = ratingBar.rating.toInt())
                tourDetailViewModel.addReview(review)
                Toast.makeText(requireContext(), "Review submit successful", Toast.LENGTH_LONG).show()
            }catch (e: Exception){
                Toast.makeText(requireContext(), "Error submitting the review", Toast.LENGTH_LONG).show()
            }

            updateRoute()
        }
        d.setNegativeButton("Cancel") { _, _ -> }
        val alertDialog = d.create()
        alertDialog.show()
    }

    fun updateRoute(){
        try {
            route = tourDetailViewModel.getRoute(route.routeId)
            rating.rating = route.averageRating.toFloat()
            ratingListAdapter.reviewList = tourDetailViewModel.getReviews(route.routeId).asList()
            ratingListAdapter.notifyDataSetChanged()
        }catch (e: Exception){
        }
    }
}

class PoiItemListener(val fragment: Fragment){
    fun onClick(poi: PointOfInterest){
        val action = TourDetailFragmentDirections.actionTourDetailFragmentToPoiFragment(poi)
        NavHostFragment.findNavController(fragment).navigate(action)
    }
}