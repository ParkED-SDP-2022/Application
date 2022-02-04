import React from "react";
import "./basic-controller.scss";
import {JoystickController} from "../../components/joystick-controller/joystick-controller";

export class BasicController extends React.Component{
    render() {
        return(
            <div className='container-fluid'>
              <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-3 d-flex flex-row justify-content-center align-items-center'>
                  <h1>Joystick</h1>
                  <JoystickController></JoystickController>
                </div>
              </div>
            </div>
        )
    }
}
