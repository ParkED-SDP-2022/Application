import React from "react";
import "./basic-controller.scss";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";
import testMap from "../../assets/map/testmap.jpg"

export class BasicController extends React.Component{
    render() {
        return(
            <div className='page-container container-fluid text-white'>
            <div className='row d-flex justify-content-center align-items-center'>
              <strong className='display-9 '>Bench 1 Controller</strong>
              <p>Use the joystick below the move the robot</p>
            </div>

              <div className='div1 row'>
                <div className='col-8 d-flex flex-column justify-content-start align-items-center'>
                  <h3 className='mb-4'>Map of Park</h3>
                  <img src={testMap} alt="test image of map"/>
                </div>
              <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
                <h3 className='mb-4' >Joystick Controller</h3>
                <div className='mt-3'>
                  <JoystickController/>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
