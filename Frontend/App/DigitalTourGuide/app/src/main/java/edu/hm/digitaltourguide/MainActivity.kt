package edu.hm.digitaltourguide

import android.content.SharedPreferences
import android.os.Bundle
import android.os.StrictMode
import android.os.StrictMode.ThreadPolicy
import android.view.Menu
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.core.view.isVisible
import androidx.drawerlayout.widget.DrawerLayout
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.navigation.NavigationView
import edu.hm.digitaltourguide.data.signIn.LoginDataSource
import edu.hm.digitaltourguide.data.signIn.LoginRepository


class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration

    companion object {
        lateinit var preferences: SharedPreferences
    }

    override fun onCreate(savedInstanceState: Bundle?) {

            StrictMode.setThreadPolicy(
                ThreadPolicy.Builder()
                    .detectDiskReads()
                    .detectDiskWrites()
                    .detectNetwork() // or .detectAll() for all detectable problems
                    .penaltyLog()
                    .build()
            )

        preferences = getSharedPreferences("sharedPrefsUser", MODE_PRIVATE)

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        val drawerLayout: DrawerLayout = findViewById(R.id.drawer_layout)
        val navView: NavigationView = findViewById(R.id.nav_view)
        val navController = findNavController(R.id.nav_host_fragment)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(setOf(
                R.id.nav_home, R.id.nav_maps, R.id.tourListFragment , R.id.tourDetailFragment), drawerLayout)
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)


        val loginBtn = findViewById<Button>(R.id.login_button)
        loginBtn.setOnClickListener{
            navController.navigateUp()
            navController.navigate(R.id.nav_login)
            drawerLayout.closeDrawers();
        }

        val logoutBtn = findViewById<Button>(R.id.logout_button)
        logoutBtn.setOnClickListener{
            logoutBtn.isVisible = false
            loginBtn.isVisible = true
            navController.navigateUp()
            navController.navigate(R.id.nav_login)
            drawerLayout.closeDrawers();

            val loginRepo = LoginRepository(dataSource = LoginDataSource())
            loginRepo.logout()

            Toast.makeText(applicationContext, "User logged out", Toast.LENGTH_LONG).show()
        }


    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}