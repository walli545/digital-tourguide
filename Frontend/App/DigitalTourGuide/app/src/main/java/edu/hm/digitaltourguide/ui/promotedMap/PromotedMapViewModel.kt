package edu.hm.digitaltourguide.ui.promotedMap

import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.BuildConfig
import edu.hm.digitaltourguide.api.apis.PointOfInterestApi
import edu.hm.digitaltourguide.api.models.PointOfInterest

class PromotedMapViewModel() : ViewModel() {

    private val poiApi: PointOfInterestApi = PointOfInterestApi(BuildConfig.BASE_URL)

    fun getAllPromotedPoIs(): Array<PointOfInterest> {
        return poiApi.getPromotedPoIs()
    }
}