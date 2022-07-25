import React, { Component } from 'react'
import { movies } from './getMovies';
import axios from 'axios';
import API_KEY from '../secrets';

export default class Banner extends Component {
  constructor(){
    super();
    // console.log("constructor is called");
    this.state = {
        trendingMovie:[],
    }
  }

  async componentDidMount(){
    let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
    // let trendingMovie = ans.data.results[0];
    this.setState({
        trendingMovie: ans.data.results[3], //[{},{},{}]
    });
}
  render() {
    return (
      <>
        {
        this.state.trendingMovie == "" ? 
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>:

        <div className="card banner-card">
          <img
                  src={`https://image.tmdb.org/t/p/original${this.state.trendingMovie.backdrop_path}`}
                  className="card-img-top banner-img"
                  alt="..."
                />
          <h5 className="card-title banner-title">{this.state.trendingMovie.original_title}</h5>
          <p className="card-text banner-text">{this.state.trendingMovie.overview}</p>
        </div>
      }
    </>
      
        
    )
  }
}
