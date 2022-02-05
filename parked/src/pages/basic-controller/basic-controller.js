import React from "react";
import "./basic-controller.scss";
import {JoystickController} from "../../components/joystick-controller/joystick-controller";

export class BasicController extends React.Component{
    render() {
        return(
            <div className='container-fluid'>
              <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                  <p className='display-3'>Joystick</p>
                  <JoystickController></JoystickController>
                </div>
              </div>
            </div>
        )
    }
}
