package edu.hm.digitaltourguide.ui.tourList

import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.models.Route
import java.util.*

class TourListViewModel() : ViewModel() {

    private val routeApi: RouteApi = RouteApi(BuildConfig.BASE_URL)

    fun getAllRoutes(): List<Route> {
        // TODO: Replace with getAllRoutes
        return listOf(routeApi.getRoute(UUID.fromString("8ea9a10b-8d97-4df2-bcf6-a4a881123fa0")))
    }

    fun getRoutesFromCreator(creator: String): List<List<Route>> {
        return listOf(routeApi.getRoutes(creator))
    }
}