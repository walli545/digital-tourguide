package edu.hm.digitaltourguide.ui.tourList

import android.app.Activity
import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import com.bumptech.glide.Glide
import edu.hm.digitaltourguide.api.models.Route
import edu.hm.digitaltourguide.databinding.FragmentTourListItemBinding


class MyTourRecyclerViewAdapter(private val values: List<Route>, private val context: Activity, private val listener: TourItemListener
) : RecyclerView.Adapter<MyTourRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            FragmentTourListItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = values[position]
        holder.bind(item, listener)
        holder.title.text = item.name
        holder.description.text = item.description

        if (item.pointOfInterests?.isNotEmpty() == true) {
            if (item.pointOfInterests[0].imageUrl.isNotEmpty()){
                Glide.with(context)
                    .load(item.pointOfInterests[0].imageUrl)
                    .into(holder.imageView)
            }
        }
    }

    override fun getItemCount(): Int = values.size

    inner class ViewHolder(val binding: FragmentTourListItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val title: TextView = binding.itemTitle
        val description: TextView = binding.itemDescription
        val imageView: ImageView = binding.itemImage

        fun bind(route: Route, listener: TourItemListener) {
            binding.route = route
            binding.root.parent
            binding.clickListener = listener
        }
    }

}