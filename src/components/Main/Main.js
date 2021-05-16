import React, { useEffect, useState } from 'react'
import './Main.css'
import RoomCard from '../RoomCard/RoomCard';
import logo from '../../assets/logo.png'

const data = require('../../assets/stays.json');
const cities = [...new Set(data.map(item => item.city))]

const Main = () => {
  const [stays, setStays] = useState(data);
  const [filteredStays, setFilteredStays] = useState(stays)
  const [filterActive, setFilterActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationActive, setLocationActive] = useState(false);
  const [guestActive, setGuestActive] = useState(false);
  const [guests, setGuests] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setGuests(adults + children);
  }, [adults, children])

  const handleSearch = () => {
    setFilteredStays(stays.filter((stay) => {
      return location ? stay.maxGuests >= guests && stay.city === location.split(",")[0] : stay.maxGuests >= guests
    }));
    setFilterActive(false);
  }

  return (
    <>
      <nav className="navbar">
        {filterActive && <>
          <div className="filter-overlay" onClick={() => { setFilterActive(false); setLocationActive(false); setGuestActive(false); }}>
          </div>
          <div className="open-nav-container">
            <div className="nav-title">
              <div>Edit your search</div>
              <i className="material-icons" style={{cursor:'pointer'}}
                onClick={() => { setFilterActive(false); setLocationActive(false); setGuestActive(false); }}>
                close</i>
            </div>
            <div className="grid-container">
              <div className="open-filter-container">
                <div className="filter-box">
                  <div className={`filter-inp ${locationActive ? "active" : ""}`} onClick={() => { setLocationActive(true); setGuestActive(false); }}>
                    <div className="text-container">
                      <div className="head">LOCATION</div>
                      <div className={`text ${location ? "filled" : ""}`}>{location ? location : "Add Location"}</div>
                    </div>
                  </div>
                  <div className="vertical"></div>
                  <div className="horizontal"></div>
                  <div className={`filter-inp ${guestActive ? "active" : ""}`} onClick={() => { setGuestActive(true); setLocationActive(false) }}>
                    <div className="text-container">
                      <div className="head">GUESTS</div>
                      <div className={`text ${guests > 0 ? "filled" : ""}`}>{guests > 0 ? `${guests} ${guests === 1 ? "guest" : "guests"}` : "Add Guest"}</div>
                    </div>
                  </div>
                  <div className="vertical"></div>
                  <div className="filter-inp search">
                    <div className="search-btn" onClick={handleSearch}>
                      <i className="material-icons">search</i>
                      Search
                    </div>
                  </div>
                </div>
              </div>
              {
                locationActive && <div className="filter-options location">
                  <ul className="location-list">
                    {cities.map((city, index) =>
                      <li className={`location-item ${location?.split(",")[0] === city ? "active" : ""}`}
                        onClick={() => setLocation(`${city}, Finland`)} key={index}>{city}, Finland</li>)}
                  </ul>
                </div>
              }
              {
                guestActive && <div className="filter-options guest">
                  <div className="guest-option">
                    <div className="option title">Adults</div>
                    <div className="option">Ages 13 or above</div>
                    <div className="count-wrapper">
                      <button className="count-change"
                        onClick={() => `${adults > 0 && setAdults(adults - 1)}`}>-</button>
                      <span className="count title">{adults}</span>
                      <button className="count-change"
                        onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                  </div>
                  <div className="guest-option">
                    <div className="option title">Childern</div>
                    <div className="option">Ages 2-12</div>
                    <div className="count-wrapper">
                      <button className="count-change"
                        onClick={() => `${children > 0 && setChildren(children - 1)}`}>-</button>
                      <span className="count title">{children}</span>
                      <button className="count-change"
                        onClick={() => setChildren(children + 1)}>+</button>
                    </div>
                  </div>
                </div>
              }
              <div className="search-btn mobile" onClick={handleSearch}>
                <i className="material-icons">search</i>
                      Search
                    </div>
            </div>
          </div>
        </>}
        <div className="logo-container">
          <img src={logo} alt='logo'/>
        </div>
        <div className="input-container" onClick={() => setFilterActive(true)}>
          <div className={`inp text ${location ? "filled" : ""}`}>
            {location ? location : "Add Location"}
          </div>
          <div className="vertical"></div>
          <div className={`inp text ${guests > 0 ? "filled" : ""}`}>
            {guests > 0 ? `${guests} ${guests === 1 ? "guest" : "guests"}` : "Add guests"}
          </div>
          <div className="vertical"></div>
          <div className="inp icon">
            <i className="material-icons search-icon">search</i>
          </div>
        </div>
      </nav>
      <div className="heading-container">
        <div className="heading">
          Stays in Finland
        </div>
        <div className="info">
          {filteredStays.length} stays
        </div>
      </div>
      <div className="container">
        {
          filteredStays ? filteredStays.map((room) =>
            <RoomCard key={room.title} room={room} />
          )
            : <div>No results found!</div>
        }
      </div>
    </>
  )
}

export default Main