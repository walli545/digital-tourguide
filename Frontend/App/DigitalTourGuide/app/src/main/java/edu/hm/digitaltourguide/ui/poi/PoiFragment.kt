package edu.hm.digitaltourguide.ui.poi

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
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.denzcoskun.imageslider.models.SlideModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.databinding.FragmentPoiBinding


class PoiFragment : Fragment() {

    private lateinit var ratingListAdapter: RatingListAdapter
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
        val ratingList = binding.ratingRecycler
        val descriptionText = binding.poiDescription
        val rating = binding.ratingBar
        val rateBtn = binding.ratePoiBtn

        (requireActivity() as AppCompatActivity).supportActionBar?.title = poi.name

        // Initialize and assign Adapter to PoiList RecyclerView
        ratingListAdapter = RatingListAdapter(listOf(poi, poi))
        ratingList.adapter = ratingListAdapter
        ratingList.layoutManager = LinearLayoutManager(context)
        descriptionText.text = poi.description

        // Route Poi Pictures
        val slideModels = arrayListOf<SlideModel>()
        if (!poi.imageUrl.isNullOrEmpty()) {
            slideModels.add(SlideModel(poi.imageUrl))
        }
        imageSlider.setImageList(slideModels, true)

        var urlStaticMap =
            "https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=1000x300&maptype=hybrid&markers=color:red|" + poi.latitude + "," + poi.longitude + "&key=" + BuildConfig.API_KEY

        context?.let {
            Glide.with(it)
                .load(urlStaticMap)
                .into(binding.poiPreviewImage)
        }

        rating.rating = poi.averageRating.toFloat()

        val swipeDeleteHandler = object : SwipeToDeleteCallback(context) {
            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                AlertDialog.Builder(context!!)
                    .setTitle("Delete review")
                    .setMessage("Are you sure you want to delete this review?")
                    .setPositiveButton(
                        android.R.string.yes
                    ) { dialog, which ->
        //                val item = ratingListAdapter.ratingList[viewHolder.adapterPosition]
        //                API.deleteRating(item)
                        // Continue with delete operation
                    } // A null listener allows the button to dismiss the dialog and take no further action.
                    .setNegativeButton(android.R.string.no, null)
                    .setIcon(R.drawable.ic_delete_purple_24)
                    .show()
                ratingListAdapter.notifyDataSetChanged()
            }
        }

        val role = MainActivity.preferences.getString("ROLE", null)
        if (role != null && role == "moderator"){
            val itemTouchHelperDelete = ItemTouchHelper(swipeDeleteHandler)
            itemTouchHelperDelete.attachToRecyclerView(ratingList)
        }

        rateBtn.setOnClickListener{
            openAddPoiReviewDialog()
        }

        return binding.root
    }

    /**
     * Method to open dialog to edit timer value
     */
    private fun openAddPoiReviewDialog(){
        val d = AlertDialog.Builder(requireContext())
        val inflater = this.layoutInflater
        val dialogView = inflater.inflate(R.layout.poi_dialog_rating, null)
        d.setTitle("Edit Shopping Item")
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

