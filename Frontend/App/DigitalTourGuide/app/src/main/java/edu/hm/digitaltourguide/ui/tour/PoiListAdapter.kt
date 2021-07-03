package edu.hm.digitaltourguide.ui.tour

import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import edu.hm.digitaltourguide.R
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourListItemBinding
import edu.hm.digitaltourguide.databinding.RecyclerViewPoiItemBinding
import edu.hm.digitaltourguide.ui.tourList.MyTourRecyclerViewAdapter
import edu.hm.digitaltourguide.ui.tourList.TourItemListener

class PoiListAdapter(private val poiList: List<PointOfInterest>, private val context: Activity, private val listener: PoiItemListener) :
    RecyclerView.Adapter<PoiListAdapter.ViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            RecyclerViewPoiItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val item = poiList[position]
        holder.bind(item, listener)
        holder.itemTitle.text = item.name
        Glide.with(context)
            .load(item.imageUrl)
            .into(holder.itemImage)
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = poiList.size

    inner class ViewHolder(val binding: RecyclerViewPoiItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val itemTitle: TextView = binding.poiItemTitle
        val itemImage: ImageView = binding.poiItemImage

        fun bind(poi: PointOfInterest, listener: PoiItemListener) {
            binding.poi = poi
            binding.root.parent
            binding.clickListener = listener
        }
    }
}