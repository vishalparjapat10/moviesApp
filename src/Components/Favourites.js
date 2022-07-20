import React, { Component } from 'react'
import axios from 'axios';
import API_KEY from '../secrets';

export default class Favourites extends Component {

    constructor(){
        super();
        this.state = {
            movies:[],
            genre:[],
            curGenre:"All Genres"
        }
    }

     handleGenre = async (genre) =>{
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
        let updatedMovies = ans.data.results;
        
        
        
        console.log(genre);
        let genreMovies;
        
        if(genre !== 'All Genres'){
            genreMovies = updatedMovies.filter((movie) =>{
                if(genreId[movie.genre_ids[0]] == genre){
                    console.log("Movie = ",movie);
                    return movie;
                }
            });
        }
        else{
            genreMovies = updatedMovies;
        }
        
        console.log(genreMovies);
        this.setState({
            curGenre: genre,
            movies: [...genreMovies]
        })
    }
    async componentDidMount(){
        console.log("component did mount is called");
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
        let genreArr = [];
        ans.data.results.map((movieObj) =>{
            if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
                genreArr.push(genreId[movieObj.genre_ids[0]])
            }
        });
        genreArr.unshift("All Genres");
        this.setState({
            movies: [...ans.data.results], //[{},{},{}]
            genre: [...genreArr]
        });

        console.log('genre array = ',genreArr);
    }
  render() {
    let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    return (
        <div class="row">
            <div class="col-3 favourites-list">
                <ul class="list-group">
                    {
                        this.state.genre.map((genre)=>(
                            this.state.curGenre == genre ?
                            <li class="list-group-item active" aria-current="true">
                                {genre}
                            </li> :
                            
                            <li class="list-group-item" aria-current="true" onClick={() => this.handleGenre(genre)}>{genre}</li>
                        ))
                    }
                </ul>
            </div>
            <div class="col favourites-table">
                <div className='row'>
                    <input type='text' className='col-8' placeholder='Search'></input>
                    <input type='number' className='col-4' placeholder='5'c></input>
                </div>
                <div className='row'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Popularity</th>
                                <th scope="col">Rating</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map((movieObj) => (
                                    <tr>
                                        <td scope='row'>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: "8rem" ,marginRight:"10px"}}/>
                                            {movieObj.original_title}
                                        </td>
                                        <td>{genreId[movieObj.genre_ids[0]]}</td>
                                        <td>{movieObj.popularity}</td>
                                        <td>{movieObj.vote_average}</td>
                                        <td><button className='btn btn-outline-danger'>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
  }
}
