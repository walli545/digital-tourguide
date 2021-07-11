
# Digital tourguide

During our lecture in Software Engineering II during summer 2021 at Munich University of Applied Sciences we had the task to develop an application that fits into the topic city traveling.
We created *Digital Tourguide*, an application that allows users to get to know new cities easier. By only allowing verified content creators to create new routes,
we want to ensure a high quality of routes. We finance our startup by enabling promoters (e.g. owners of restaurants or sights) to promote their points of
interests on other routes.

## Team members

  * Christian Glasl
  * Marcel Köhler
  * Simon Arndt
  * Sven Schötz
  * Tobias Wallner
  * Tobias Pfatrisch

## User roles

  * Users: Normal users of the android app, taking routes, commenting and rating them
  * Moderators: Like users but can delete offensive comments
  * Content-Creators: Create routes and points of interests on the website
  * Promoters: Create promtoted points of interests which appear in other routes
  * Admins: Verify role requests of other users

## Technologies

  * Android app with Kotling and Google Maps
  * Angular website with Google Maps and Angular Material
  * Asp .Net Core backend with EntityFramework
  * MySQL Database
  * Keycloak
  * Kubernetes and Docker (new deployments per branch to have review versions for merge requests)
  * Common OpenAPI Spec with generators for Angular and Kotlin service code

## Screenshots

### Website

Route management (with drag and drop):
![Animation](https://user-images.githubusercontent.com/10282777/125197705-152d6880-e25f-11eb-82c5-8daaf31027a1.gif)

Point of interest management:
![Animation2](https://user-images.githubusercontent.com/10282777/125197709-1d85a380-e25f-11eb-9a21-ebf36686d21f.gif)

Login and sign up with Keycloak:

![Screenshot 2021-07-11 154650](https://user-images.githubusercontent.com/10282777/125197850-9dac0900-e25f-11eb-9a4d-ca9e3ce34aca.jpg)

Request new role:

![Screenshot 2021-07-11 154724](https://user-images.githubusercontent.com/10282777/125197859-a7357100-e25f-11eb-9fac-cd1b0c4a4e91.jpg)

Verify role requests as admin:

![Screenshot 2021-07-11 154846](https://user-images.githubusercontent.com/10282777/125197868-b1f00600-e25f-11eb-85e1-78dc7f260460.jpg)

### Android App

Home screen:

<img src="https://user-images.githubusercontent.com/10282777/125197954-1ad77e00-e260-11eb-8e7c-770373f0c404.jpg" width="300">

Route overview:

<img src="https://user-images.githubusercontent.com/10282777/125197925-f8ddfb80-e25f-11eb-8271-ee6037538196.jpg" width="300">

View route:

<img src="https://user-images.githubusercontent.com/10282777/125197925-f8ddfb80-e25f-11eb-8271-ee6037538196.jpg" width="300">

Take route:

<img src="https://user-images.githubusercontent.com/10282777/125197933-01363680-e260-11eb-8123-75ca3ba9283c.jpg" width="300">

View point of interest (with comments and rating):

<img src="https://user-images.githubusercontent.com/10282777/125197942-0c896200-e260-11eb-92fc-47f57d2b1c20.jpg" width="300">


