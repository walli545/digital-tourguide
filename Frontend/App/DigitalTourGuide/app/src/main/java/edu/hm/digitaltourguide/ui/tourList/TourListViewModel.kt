package edu.hm.digitaltourguide.ui.tourList

import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.models.Route
import java.util.*

class TourListViewModel() : ViewModel() {

    private val routeApi: RouteApi = RouteApi("http://10.0.2.2:5000")

    fun getAllRoutes(): List<Route> {
        return listOf(routeApi.getRoute(UUID.fromString("8ea9a10b-8d97-4df2-bcf6-a4a881123fa0")))
    }

    fun getRoutesFromCreator(creator: String): List<List<Route>> {
        return listOf(routeApi.getRoutes(creator))
    }
}