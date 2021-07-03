package edu.hm.digitaltourguide.ui.tourList

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.hm.digitaltourguide.api.models.PoIReview
import edu.hm.digitaltourguide.api.models.RouteReview
import edu.hm.digitaltourguide.databinding.PoiRatingItemBinding

class RatingListAdapter(var reviewList: List<RouteReview>) :
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

        val item = reviewList[position]
        holder.itemComment.text = item.userName + ": " + item.content
        holder.itemRatingBar.rating = item.rating.toFloat()
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = reviewList.size

    inner class ViewHolder(val binding: PoiRatingItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val itemRatingBar: RatingBar = binding.ratingBar
        val itemComment: TextView = binding.comment
    }
}