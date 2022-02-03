import React, { Component } from 'react';
import App from '../App';

class Home extends Component{
    constructor(){
        super();

        this.state = {
            name:"alice",
            age:"30",
            userinfo:{
                username:"al"
            }
        }
    }

    render(){
        return (<div>
            <h2>hello react i'm Home component</h2>
            <p>name:{this.state.name}</p>
            <p>age:{this.state.name}</p>
            <p>obj:{this.state.userinfo.username}</p>
        </div>)
    }
}

export default Home;