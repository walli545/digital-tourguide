package edu.hm.digitaltourguide

import android.content.Context
import android.util.AttributeSet

class TourPreview(context: Context, attrs: AttributeSet) : androidx.constraintlayout.widget.ConstraintLayout(context, attrs) {
    init {
        inflate(context, R.layout.tour_preview, this)
    }
}