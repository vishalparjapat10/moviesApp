import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <h1>Movies App</h1>
        <h2 style={{marginLeft:'2rem'}}>Favourites</h2>
      </div>
    )
  }
}
