package edu.hm.digitaltourguide

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.gms.maps.model.PolylineOptions
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.Route

class RoutePreviewAdapter(var routes: List<Route>) :
    RecyclerView.Adapter<RoutePreviewAdapter.RoutePreviewHolder>() {

    class RoutePreviewHolder(itemView: View) : RecyclerView.ViewHolder(itemView),
        OnMapReadyCallback {

        private val mapView: MapView = itemView.findViewById(R.id.tour_preview_map)
        private lateinit var map: GoogleMap
        private lateinit var latLng: LatLng
        private lateinit var route: Route

        init {
            with(mapView) {
                onCreate(null)
                getMapAsync(this@RoutePreviewHolder)
            }
        }

        fun bind(route: Route) {
            itemView.findViewById<TextView>(R.id.tour_preview_text).text = route.name
            itemView.findViewById<TextView>(R.id.tour_preview_description).text = route.description
            itemView.findViewById<TextView>(R.id.tour_preview_estimate).text =
                String.format("%.2f h", route.duration)

            latLng = LatLng(
                route.pointOfInterests[0].latitude.toDouble(),
                route.pointOfInterests[0].longitude.toDouble()
            )

            this.route = route
        }

        override fun onMapReady(gMap: GoogleMap) {
            MapsInitializer.initialize(itemView.context)
            map = gMap ?: return
            setLocation(route.pointOfInterests)
        }

        private fun setLocation() {
            if (!::map.isInitialized) return
            with(map) {
                moveCamera(CameraUpdateFactory.newLatLngZoom(latLng, 13f))
                mapType = GoogleMap.MAP_TYPE_NORMAL
                setOnMapClickListener {

                }
            }
        }

        private fun setLocation(pointOfInterests: List<PointOfInterest>) {
            setLocation()
            with(map) {
                val lats = mutableListOf<LatLng>()
                pointOfInterests.forEach {
                    val coordinates = LatLng(
                        it.latitude.toDouble(),
                        it.longitude.toDouble()
                    )
                    lats.add(coordinates)
                    addMarker(
                        MarkerOptions()
                            .position(coordinates)
                            .title(it.name)
                    )
                }
                addPolyline(
                    PolylineOptions()
                        .addAll(lats)
                )
            }
        }

        fun clearView() {
            with(map) {
                // Clear the map and free up resources by changing the map type to none
                clear()
                mapType = GoogleMap.MAP_TYPE_NONE
            }
        }
    }

    //private val recycleListener = RecyclerView.RecyclerListener { holder ->
    //    val mapHolder = holder as RoutePreviewAdapter.RoutePreviewHolder
    //    mapHolder.clearView()
    //}

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RoutePreviewHolder {
        val itemView = LayoutInflater.from(parent.context)
            .inflate(R.layout.tour_preview, parent, false)
        return RoutePreviewHolder(itemView)
    }

    override fun onBindViewHolder(holder: RoutePreviewHolder, position: Int) =
        holder.bind(routes[position])

    override fun getItemCount(): Int = routes.size

}