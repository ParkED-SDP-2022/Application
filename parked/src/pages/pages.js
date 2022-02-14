import React from "react";
import { BasicController } from "./basic-controller/basic-controller";
import { Link, useLocation } from "react-router-dom";


function Header() {
    return (
      <div className='parkedHeader'>
        <img src={require('../assets/branding/logo.png')} className='logo'/>
        <nav className="navigationBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/yourbenches">YourBenches</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

export function Home() {
    return (
        <div>
            <Header />
            <h1>Home Page</h1>
        </div>
    )
}

export function About() {
    return (
        <div>
            <Header />
            <h1>About Page</h1>
        </div>
    )
}

export function YourBenches() {
    return (
        <div>
            <Header />
            <BasicController/>
        </div>
    )
}

export function Whoops404() {
    let location = useLocation();
    console.log(location);
    return (
        <div>
            <Header />
            <h1>
                Resource not found at {location.pathname}.
            </h1>
        </div>
    )
}