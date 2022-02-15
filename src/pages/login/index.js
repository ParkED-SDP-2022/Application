import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <form>
        {/*Username*/}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
          type="email" 
          className="form-control" 
          id="exampleInputEmail1"/>
        </div>

        {/*Password*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>

        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    )
  }
}
