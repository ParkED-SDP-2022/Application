import React, { useState } from "react";
import "./pages.scss";
import { AccountPage } from "./accountPage/account";
import { MultiPage } from "./multiPage/multi";
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
              <Link to="/account" className={"link-styles fa fa-map"}></Link>
        </menu>

      </div>
    </>
  )
}

export function Home() {
    return (
        <div className="HomePage">
          <div className="home-bg"></div>
          <div className="home-ol"></div>
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
            
            <div className="infoCards">
              <div className="aboutText c1">
                <h2>What We Do:</h2>
                <p>Our benches are designed so that we can optimise people's use of park benches by ensuring benches can be located in the most in-demand locales. However their value can extend to town squares, campuses, large fairs and expos.</p>
                <p>Our mobile benches can be programmed to move to set locations around the park where ther is more need. For example:
                </p>
                  <ul>
                    <li>In summer benches may be placed in the sun</li>
                    <li>In winter benches may be moved to the shelter</li>
                    <li>Benches can gather around a farmer's market which only runs once a week</li>
                    <li>Benches can organise in formations for outdoor events such as concerts, weddings, parades, etc.</li>
                  </ul>
                <p>Through our user interface the owner of a fleet of benches can track where they are and reassign them to new locations. The benches can then navigate to their newly assigned spots.</p>
                <p>The bench system tracks and stores bench usage statistics so you can get a better idea of the most in-demand areas on different days/seasons.</p>
              </div>

              <div className="aboutText c2">
                <h2>ParkED Data Collection:</h2>
                <p>ParkED benches can help you make the best use of your infrastructure by helping you identify key areas in which bench demand is increased.</p>
                <p>We achieve this by keeping track of how much time each bench is in use in any location, using a pressure sesnor mounted on the bench to detect people sitting on it.</p>
                <p>This data can be visualised to show hotspots around the park where benches are sat on the most. It can also be filtered by time to show the difference in sitting trends - for example, on different days of the week.</p>
                <p>This can ensure you don't have too many benches in places where they won't be used, and allows you to meet demand for benches in areas of most interest! We hop this will make parks more useful and engaging for park-goers, while reducing dangerous physical labour for park-workers.</p>
                <p>On a larger scale, the data our systems collect across parks and bench-fleets will help identify which parks are doing well, so councils can plan and fund the necessary features to improve less used parks. It will also help map park-usage trends over time so that this can be factored into park opening hours, or organised even timings in future.</p>
                <p>We have made an effort to ensure our benches do not impact public privacy, so the data collected will be purely anonymised data from our pressure sensors. However, we need to consider the impact of our data collection as an antisocial design mechanism, for example tracking benches being slept on over night and using this to prevent such sleeping. For this reason, we would restrict the hours our benches collect data at.</p>
              </div>
            
              <div className="aboutText c3">
                <h2>ParkED and the Community:</h2>
                <p>As with any product that is deployed in a public space, there are ethical concerns regarding ParkEd benches; we have taken care to address them to ensure that our product does not cause unintentional harm.</p>
  	            <h3>Safety</h3>
                <p>Our benches will be sharing public spaces with people, dogs, bikes etc. all of whom can be unpredictable. Great care has been taken to minimise the risk of a ParkEd bench disorienting or hitting anyone enjoying the park. When a bench is navigating a path it is constantly running a process which checks the ultrasonic sensors embedded in its front, back and sides to ensure that its path is clear (this footage is never stored). If it encounters an obstacle, it prioritises safety, waiting for a few seconds to determine the nature of the obstacle. If the obstacle is static, the bench will create a new path giving it a wide berth, ensuring the safety of those it has encountered. If it is dynamic, it will wait patiently for the obstacle to pass.</p>
                <p>If the bench were to move while it was being sat on, the sitter might be physically hurt or feel uncomfortably thrilled. We have ensured that such a situation will not happen. Pressure sensors have been installed which detect the status of a bench. The system’s architecture is such that a bench will never move if the pressure sensor is activated.</p>
                <h3>Privacy</h3>
                <p>Data collection functionality has been added to our system to improve the park going experience for all users; the popularity density of different park locations is stored and displayed to the park manager’s user interface, informing the park managers’ decision of where benches should be placed to create spaces to relax in accordance with demand. Though a key feature of our product, for good reason, the thought of passive data collection on the public can create discomfort and distrust, especially if the data subjects in question are not appropriately informed of its motives. We have addressed this important concern with care. Any data that is collected by our benches is strictly anonymous, storing only the location and time of bench interaction - there is no way that the identity of a user can be traced from this data. This data will only ever be used to inform the distribution of benches. As soon as the information is no longer relevant, it will be deleted. To ensure that we are transparent, on every model of our bench will be a clear and concise message explaining the extent of the data collection and its motives.</p>
                <h3>Experience</h3>
                <p>Parks and green spaces fulfil a very important role in cities. They can relieve stress, facilitate healthy activities and offer crucial reprieve from the grey and unyielding concrete that imposes itself on our experience. Loud noises, flashing lights and fast movements on our bench would disrupt cherished meadows making peace and quiet even harder to find. For this, and other reasons, we have made our benches move very slowly, painting them a calm green and using warning lights and sounds sparsely and only when absolutely necessary. The resulting product is one that becomes a part of the park, adding, rather than taking away from the park experience.</p>
                <p>Benches are relied upon by many groups, for example, people with mobility issues, or those that suffer from fatigue. A safe and comfortable park going experience may depend on their knowledge of a static bench’s location on which they can rest. Replacing all benches in the park with ParkED benches would take away this certainty making for an experience which goes against our values. We have stressed a balance between static and mobile benches in parks to ensure this doesn’t happen.</p>
              </div>

              <div className="aboutText c4">
                <h2>Making Money with ParkED:</h2>
                <p>We believe that using parkED benches could be a great opportunity for making extra money in your public spaces.</p>
                <p>We have researched the feasibility of rolling out advertising campaigns on fleets of benches, and believe the results are very promising!</p>
                <p>There already exists long standing advertising on public bins and bus stops and we think benches would be the perfect next step.</p>
                <p>If LED screens were mounted to the sides of our benches, then rotating advertisements could be remotely loaded onto benches with little to no extra effort.</p>
                <p>Such campaigns could cost a few pounds a day, making them appealing for advertisers and priofitable for park-owners and councils due to the minimal effort required to set them up.</p>
              </div>
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

export function Multi() {
  return (
      <div>
          <Nav />
          <MultiPage/>
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