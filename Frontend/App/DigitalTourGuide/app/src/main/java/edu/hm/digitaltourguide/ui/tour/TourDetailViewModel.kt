package edu.hm.digitaltourguide.ui.tour

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.api.apis.PoIReviewApi
import edu.hm.digitaltourguide.api.apis.PointOfInterestApi
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.apis.RouteReviewApi
import edu.hm.digitaltourguide.api.models.*
import java.util.*

class TourDetailViewModel : ViewModel(){

    private val routeAPI: RouteApi = RouteApi(BuildConfig.BASE_URL)
    private val routeReviewAPI: RouteReviewApi = RouteReviewApi(BuildConfig.BASE_URL)

    fun getReviews(routeID: UUID): Array<RouteReview> {
        return routeReviewAPI.getRouteReviews(routeID)
    }

    fun deleteReview(reviewID: UUID) {
        routeReviewAPI.deleteRouteReview(reviewID)
    }

    fun getRoute(routeID: UUID): Route {
        return routeAPI.getRoute(routeID)
    }

    fun addReview(review: PostRouteReview){
        routeReviewAPI.addRouteReview(review)
    }
}