package edu.hm.digitaltourguide

import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import edu.hm.digitaltourguide.api.models.Route
import kotlin.contracts.contract

class RoutePreviewAdapter(var routes: List<Route>, val context: Activity) :
    RecyclerView.Adapter<RoutePreviewAdapter.RoutePreviewHolder>() {


    class RoutePreviewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private lateinit var route: Route

        fun bind(route: Route, context: Activity) {

            if (route.pointOfInterests?.isNotEmpty() == true){
                Glide.with(context)
                    .load(route.pointOfInterests?.first()?.imageUrl)
                    .into(itemView.findViewById<ImageView>(R.id.tour_preview_picture))
            }


            itemView.findViewById<ImageView>(R.id.tour_preview_image)
            itemView.findViewById<TextView>(R.id.tour_preview_text).text = route.name
            itemView.findViewById<TextView>(R.id.tour_preview_description).text = route.description
            itemView.findViewById<TextView>(R.id.tour_preview_estimate).text =
                String.format("%.2f h", route.duration)

            var poiLocationsString = ""
            for (poi in route.pointOfInterests!!) {
                poiLocationsString += "|" + poi.latitude.toString() + "," + poi.longitude.toString()
            }

            val urlStaticMap = "https://maps.googleapis.com/maps/api/staticmap?size=1000x300&path=enc:"+ route.polyline + "&markers=color:red|"+ poiLocationsString + "&key=" + BuildConfig.API_KEY

            itemView.context?.let {
                Glide.with(it)
                    .load(urlStaticMap)
                    .into(itemView.findViewById(R.id.tour_preview_map))
            }

            this.route = route
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RoutePreviewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.tour_preview, parent, false)
        return RoutePreviewHolder(itemView)
    }

    override fun onBindViewHolder( holder: RoutePreviewHolder, position: Int) =
        holder.bind(routes[position], context)

    override fun getItemCount(): Int = routes.size

}