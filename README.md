# MoviesApp

## Introduction
MoviesApp is a `react.js` based application which has been developed using **class based components**. As a fan of **Hollywood movies** & **React**, always wanted to develop an app by doing which I can gain knowledge with fun. It was developed to grasp much better understanding & to dig deep into **class based components**

## Description
MoviesApp can be thought as an app on which different latest movies are rendered with different functionality provided.[TMDB](https://www.themoviedb.org/) is used as an API for getting movies for this app. It includes following features :- 

* the app basically similar to movie apps like `Netflix,Amazon Prime` etc. on which we can browse different movies(except watching).
* it bascially contains 2 pages. 
  * first page is the main page on which all the movies are rendered & on a current page we can see 20 movies.If we want to next movies then we go to next page(`pagintaion` is used).
  * second page is for **Favourites** movies section which contain all the added by user from the first page movies. 
* on first page there is option add one or more movies as **Favourites** which will be shown on **Favourites**.
* **filtering,searching,sorting** is also done on **Favourites** page i.e we can filter out movies on the basis of genres, search any favourite movie, sort movie on the basis of **Popularity** or **Rating**. We can also **delete** any movie on the same page.

## To run this project locally
To run this project, first need to create `API` key [TMDB](https://www.themoviedb.org/) & store in `secrets.js` file inside `src` folder & export & then import where it has been used & then install the project locally using npm:

```
$ cd ./moviesApp
$ npm install
$ npm start
```
### Hosted Netlify link(https://isnt-vishalparjapat12527-gmail-com-awesome-9493a.netlify.app/) 
