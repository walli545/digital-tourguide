package edu.hm.digitaltourguide.ui.signIn.register

/**
 * Data validation state of the login form.
 */
data class RegisterFormState(
    val usernameError: Int? = null,
    val passwordError: Int? = null,
    val passwordRepeatedError: Int? = null,
    val isDataValid: Boolean = false
)