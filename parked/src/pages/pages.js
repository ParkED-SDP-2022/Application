import React, { useState } from "react";
import "./pages.scss";
import { AccountPage } from "./accountPage/account";
import { Link, useLocation } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


/*
Source inspiration: https://codepen.io/seyedi/pen/YXEqwB
*/
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
            <div className="textDiv">
              <h2>Welcome to the home of the mobile park bench. Where parks can adapt to meet the needs of their users!</h2>
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
            </div>
            <div className="RightSide">
            </div>
            <div className="TitleDiv">
              <h1>A Little Bit About Us</h1>
            </div>
            
            <div className="aboutText">
              <h2>What We Do:</h2>
              <p>Our benches are designed so that we can optimise people's use of park benches by ensuring benches can be located in the most in-demand locales. However their value can extend to town squares, campuses, large fairs and expos.</p>
              <p>Our mobile benches can be programmed to move to set locations around the park where ther is more need. For example:
                <ul>
                  <li>In summer benches may be placed in the sun</li>
                  <li>In winter benches may be moved to the shelter</li>
                  <li>Benches can gather around a farmer's market which only runs once a week</li>
                  <li>Benches can organise in formations for outdoor events such as concerts, weddings, parades, etc.</li>
                </ul>
              </p>
              <p>Through our user interface the owner of a fleet of benches can track where they are and reassign them to new locations. The benches can then navigate to their newly assigned spots.</p>
              <p>The bench system tracks and stores bench usage statistics so you can get a better idea of the most in-demand areas on different days/seasons.</p>
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
            <AccountPage/>
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