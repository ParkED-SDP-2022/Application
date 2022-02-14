import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

export function Home() {
    return (
        <div><h1>Home Page</h1>
        <nav><Link to="about">About</Link></nav></div>
    )
}

export function About() {
    return (
        <div>
            <h1>About Page</h1>
            <Outlet />
        </div>
    )
}

export function YourBenches() {
    return (
        <div>
            <h2>Our Services</h2>
        </div>
    )
}

export function Whoops404() {
    let location = useLocation();
    console.log(location);
    return (
        <div>
            <h1>
                Resource not found at {location.pathname}.
            </h1>
        </div>
    )
}