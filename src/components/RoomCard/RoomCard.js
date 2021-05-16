import React from 'react'
import './roomcard.css'

function RoomCard(props) {
  const { superHost, title, rating, type, beds, photo } = props.room;
  return (
    <div className="card-container">
      <div className="img-container">
        <img className="img" src={photo} alt='title'/>
      </div>
      <div className="details-ribbon">
        <div className="details">
          {superHost && <span className="badge">SUPER HOST</span>}
          <span className="type">{type} {`${beds ? `${beds === 1 ? " . 1 bed" : ` . ${beds} beds`}` : ""}`}</span>
        </div>
        <div className="rating-container">
          <span className="material-icons star-icon">&#xe838;</span>
          <span className="rating">{rating}</span>
        </div>
      </div>
      <div className="title">{title}</div>
    </div>
  )
}

export default RoomCard
