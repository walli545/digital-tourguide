package edu.hm.digitaltourguide.ui.poi

import android.app.Activity
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.databinding.PoiRatingItemBinding

class RatingListAdapter(private val poiList: List<PointOfInterest>) :
    RecyclerView.Adapter<RatingListAdapter.ViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            PoiRatingItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val item = poiList[position]
        holder.itemComment.text = item.name
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = poiList.size

    inner class ViewHolder(val binding: PoiRatingItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val itemRatingBar: RatingBar = binding.ratingBar
        val itemComment: TextView = binding.comment
    }
}