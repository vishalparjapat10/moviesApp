// import { hover } from '@testing-library/user-event/dist/hover';
import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';
import API_KEY from '../secrets';

export default class List extends Component {

    constructor(){
        super();
        // console.log("constructor is called");
        this.state = {
            hover: "",
            parr:[1],// ab tak m konse page pr hu, or what page result am i showing
            currPage:1,
            movies:[],
            favMov:[] // will store movies which are added to favourites
        }
    }

    handleEnter = (id) => {
        this.setState({
          hover:id
      })
    };

    handleLeave = () => {
        this.setState({
            hover: '',
        });
    };

    changeMovies = async () =>{
        console.log(this.state.currPage);
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
        console.log("changeMovies");
        this.setState({
            movies: [...ans.data.results], //[{},{},{}]
        });
    }

    handleNext = () =>{
        let tempArr = [];
        for(let i = 1;i <= this.state.parr.length + 1;i++){
            tempArr.push(i);// [1,2]
        }
        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage + 1
        },this.changeMovies);
        // console.log(this.state.currPage);// this.setState is an asynchronous function, so we try to print any value which is just being updating might not show yet, so wew ill pass changeMovies function as a callback so that when currPage value is updated this function will be called
    }

    handlePrevious = () =>{
        let tempArr = [];
        if(this.state.parr.length == 1){
            tempArr.push(1);
        }
        else{
            for(let i = 1;i <= this.state.parr.length + 1;i++){
            tempArr.push(i);// [1,2]
            }
            for(let i = this.state.parr.length ;i >= this.state.parr.length - 1;i--){
                tempArr.pop(i);
            }
        }
        
        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage -1
        },this.changeMovies);
        // console.log(this.state.currPage);// this.setState is an asynchronous function, so we try to print any value which is just being updating might not show yet, so wew ill pass changeMovies function as a callback so that when currPage value is updated this function will be called
    }

    handlePageNo = (pNo) =>{
        this.setState({
            currPage: pNo
        },this.changeMovies)
    }

    handleFavourites = (movieObj) =>{
        let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];
       
        if(this.state.favMov.includes(movieObj.id)){
            localStorageMovies = localStorageMovies.filter(movie => movie.id != movieObj.id);
        }
        else{
            localStorageMovies.push(movieObj);
        }
        console.log(localStorageMovies);
        localStorage.setItem("movies",JSON.stringify(localStorageMovies));
        let tempData = localStorageMovies.map(movieObj => movieObj.id);

        this.setState({
            favMov:[...tempData]
        })

    }
    async componentDidMount(){
        console.log("component did mount is called");
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`);
        
        this.setState({
            movies: [...ans.data.results], //[{},{},{}]
        });
    }

  render() {
    console.log("render is called");
    // let movie = movies.results;
    // console.log("Movies in render",this.state.movies);
    return (
      <>
        {
            this.state.movies.length == 0 ? (
                <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> 
                ) : (
                    <div>
                        <h3 className='text-center'>
                            <strong>Trending</strong>
                        </h3>
                        <div className='movies-list'>
                        {
                            this.state.movies.map((movieObj) => {
                                return(
                                    
                                    <div className="card movie-card" onMouseEnter={() => this.handleEnter(movieObj.id)} onMouseLeave={this.handleLeave} >
                                        {/* {console.log(movieObj)} */}
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                            className="card-img-top movie-img"
                                            alt="..."
                                            style={{height:'40vh',width:'20vw'}}
                                        />  
                                        <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                        <div className='button-wrapper'>
                                            {
                                                this.state.hover == movieObj.id && 
                                                <a className="btn btn-primary movie-button" onClick={() => {this.handleFavourites(movieObj)}}>
                                                    {this.state.favMov.includes(movieObj.id) ? "Remove from Favourites" : "Add to Favourites"  } 
                                                </a>
                                            }
                                            
                                        </div>
                                 </div>
                            )})
                        }
                        </div>
                        <div className='pagination'>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handlePrevious} >Previous</a></li>
                                    {this.state.parr.map((pageNum) => (
                                            <li class="page-item"><a class="page-link" onClick={() => {this.handlePageNo(pageNum)}}>{pageNum}</a></li>
                                        ))}
                                    
                                    <li class="page-item"><a class="page-link" onClick={this.handleNext} >Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    
                )
        }
        
      </>
    )
  }
}
