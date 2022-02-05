import React from "react";
import "./basic-controller.scss";
import {JoystickController} from "../../components/joystick-controller/joystick-controller";

export class BasicController extends React.Component{
    render() {
        return(
            <div className='container-fluid'>
              <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-12 d-flex flex-column justify-content-center align-items-center'>
                  <p className='display-3'>Bench 1 Controller</p>
                  <p className='text-info pb-4'>Use the joystick below the move the robot</p>
                  <JoystickController/>
                </div>
              </div>
            </div>
        )
    }
}
