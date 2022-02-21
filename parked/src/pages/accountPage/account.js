import React from "react";
import "./account.scss";
import { JoystickController } from "../../components/joystick-controller/joystick-controller";
import testMap from "../../assets/map/test.geojson";
import benches from "../../assets/map/benches.geojson";
import Map from "../../components/map/Map";
import Form from "../../components/form/form";

export class AccountPage extends React.Component{
    render() {
        return(
            <div className='AccountPage'>
                <div className='MapSide'>
                  <Map parkBoundaries={testMap} benches={benches} className="map"/>
                </div>
              <div className='ControlSide'>
                  <div className="MoveForm">
                      <Form />
                  </div>
                  <div className="Joystick">
                    <JoystickController/>
                  </div>
              </div>
          </div>
        )
    }
}
