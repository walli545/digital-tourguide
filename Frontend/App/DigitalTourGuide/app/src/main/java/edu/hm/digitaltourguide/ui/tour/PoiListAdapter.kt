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

class PoiListAdapter(private val context: Activity, private val poiList: Array<String>, private val imageList: Array<String>) :
    RecyclerView.Adapter<PoiListAdapter.ViewHolder>() {

    /**
     * Provide a reference to the type of views that you are using
     * (custom ViewHolder).
     */
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val itemTitle: TextView = view.findViewById(R.id.poi_item_title)
        val itemImage: ImageView = view.findViewById(R.id.poi_item_image)

        init {
            // Define click listener for the ViewHolder's View.
        }
    }

    // Create new views (invoked by the layout manager)
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ViewHolder {
        // Create a new view, which defines the UI of the list item
        val view = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.recycler_view_poi_item, viewGroup, false)

        return ViewHolder(view)
    }

    // Replace the contents of a view (invoked by the layout manager)
    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {

        // Get element from your dataset at this position and replace the
        // contents of the view with that element
        viewHolder.itemTitle.text = poiList[position]
        Glide.with(context)
            .load(imageList[position])
            .into(viewHolder.itemImage)
    }

    // Return the size of your dataset (invoked by the layout manager)
    override fun getItemCount() = poiList.size
}