package edu.hm.digitaltourguide.ui.signIn.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import edu.hm.digitaltourguide.data.signIn.RegisterDataSource
import edu.hm.digitaltourguide.data.signIn.RegisterRepository

/**
 * ViewModel provider factory to instantiate LoginViewModel.
 * Required given LoginViewModel has a non-empty constructor
 */
class RegisterViewModelFactory : ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(RegisterViewModel::class.java)) {
            return RegisterViewModel(
                registerRepository = RegisterRepository(
                    dataSource = RegisterDataSource()
                )
            ) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}