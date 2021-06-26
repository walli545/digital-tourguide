package edu.hm.digitaltourguide.ui.poi

import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.MainActivity
import edu.hm.digitaltourguide.api.apis.PoIReviewApi
import edu.hm.digitaltourguide.api.apis.PointOfInterestApi
import edu.hm.digitaltourguide.api.apis.RouteApi
import edu.hm.digitaltourguide.api.infrastructure.ApiClient
import edu.hm.digitaltourguide.api.models.PoIReview
import edu.hm.digitaltourguide.api.models.PointOfInterest
import edu.hm.digitaltourguide.api.models.PostPoIReview
import edu.hm.digitaltourguide.api.models.Route
import java.util.*

class PoiViewModel() : ViewModel() {

    private val poiAPI: PointOfInterestApi = PointOfInterestApi(BuildConfig.BASE_URL)
    private val poiReviewAPI: PoIReviewApi = PoIReviewApi(BuildConfig.BASE_URL)

    fun getReviews(poiID: UUID): Array<PoIReview> {
        return poiReviewAPI.getPoIReviews(poiID)
    }

    fun deleteReview(reviewID: UUID) {
        poiReviewAPI.deletePoIReview(reviewID)
    }

    fun getPoi(poiID: UUID): PointOfInterest {
        return poiAPI.getPOI(poiID)
    }

    fun addReview(review: PostPoIReview){
        poiReviewAPI.addPoIReview(review)
    }
}