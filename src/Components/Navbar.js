import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        {/* if I click on h1 tag of Movies App then we will be directed to / path which was supposed to render List component as defined in App.js */}
        <Link to="/" style={{textDecoration:"none",color:"#d91d2a"}}>
          <h1>Movies App</h1>
        </Link>
        <Link to="/fav" style={{textDecoration:"none",color:"#d91d2a"}}>
          <h2 style={{marginLeft:'2rem'}}>Favourites</h2>
        </Link>
        
      </div>
    )
  }
}
