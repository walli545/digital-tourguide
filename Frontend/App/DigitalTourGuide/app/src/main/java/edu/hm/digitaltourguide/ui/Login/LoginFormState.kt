package edu.hm.digitaltourguide.ui.login

/**
 * Data validation state of the login form.
 */
data class LoginFormState(
    val usernameError: Int? = null,
    val passwordError: Int? = null,
    val passwordRepeatedError: Int? = null,
    val isDataValid: Boolean = false
)