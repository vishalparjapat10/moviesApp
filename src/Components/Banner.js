import React, { Component } from 'react'
import { movies } from './getMovies' 

export default class Banner extends Component {
  render() {

    let movie  = movies.results[7];
    return (
      <>
        {
        movie == "" ? 
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>:

        <div className="card banner-card">
          <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="card-img-top banner-img"
                  alt="..."
                />
          <h5 className="card-title banner-title">{movie.original_title}</h5>
          <p className="card-text banner-text">{movie.overview}</p>
        </div>
      }
    </>
      
        
    )
  }
}
