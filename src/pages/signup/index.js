import React, { Component } from 'react'

export default class Signup extends Component {
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

        {/*Email*/}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email"/>
        </div>

        {/*Password*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>

        {/*ConfirmPassword*/}
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input type="password" className="form-control" id="passwordConfirm" />
        </div>

        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}
