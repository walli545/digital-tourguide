package edu.hm.digitaltourguide.ui.tourList

import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.infrastructure.ApiClient
import edu.hm.digitaltourguide.api.models.Route
import java.util.*

class TourListViewModel() : ViewModel() {

    private val routeApi: RouteApi = RouteApi(BuildConfig.BASE_URL)

    fun getAllRoutes(): Array<Route> {
        return routeApi.getAllRoutes()
    }
}