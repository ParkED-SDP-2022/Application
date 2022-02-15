import React, { useState } from "react";
import "./pages.scss";
import { BasicController } from "./basic-controller/basic-controller";
import { Link, useLocation } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

function Nav() {

  const [active, setActive] = useState(false);

  return (
    <>
      <div id="circularMenu" className={active ? 'circular-menu active' : 'circular-menu '}>

        <a className="floating-btn" onClick={() => setActive(!active)}>
          <i className="fa fa-bars"></i>
        </a>

        <menu className="items-wrapper">
              <Link to="/" className={"link-styles fa fa-home"}></Link>
              <Link to="/about" className={"link-styles fa fa-address-card"}></Link>
              <Link to="/account" className={"link-styles fa fa-user"}></Link>
        </menu>

      </div>
    </>
  )
}

export function Home() {
    return (
        <div className="HomePage">
          <div className="Home">
            <div className="logoDiv">
              <img src={require('../assets/branding/logo.png')} className='logo'/>
            </div>
          </div>
          <Nav />
        </div>
    )
}

export function About() {
    return (
        <div>
          <div className="AboutPage">
            <div className="LeftSide">
              What we do
            </div>
            <div className="RightSide">
              Why we do it
            </div>
          </div>
            <Nav />
        </div>
    )
}

export function Account() {
    return (
        <div>
            <Nav />
            <BasicController/>
        </div>
    )
}

export function Whoops404() {
    let location = useLocation();
    console.log(location);
    return (
        <div>
            <Nav />
            <h1>
                Resource not found at {location.pathname}.
            </h1>
        </div>
    )
}