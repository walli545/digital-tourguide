package edu.hm.digitaltourguide.ui.tour

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TourDetailViewModel : ViewModel(){

    private val _text = MutableLiveData<String>().apply {
        value = "This is the TourDetailFragment"
    }
    val text: LiveData<String> = _text
}