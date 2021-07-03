package edu.hm.digitaltourguide.ui.home

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import edu.hm.digitaltourguide.api.models.Route

class HomeViewModel(private val state: SavedStateHandle) : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is home Fragment"
    }
    val text: LiveData<String> = _text

    val lastTour = state.getLiveData<Route>("tour")

    fun setLastTour(tour: Route) {
        state.set("tour", tour)
    }

    fun saveState() {
        state.set("tour", lastTour.value)
    }
}