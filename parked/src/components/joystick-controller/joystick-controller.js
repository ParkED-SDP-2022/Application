import React from "react";
import "./joystick-controller.scss"
import {Joystick} from "react-joystick-component";

export class JoystickController extends React.Component{
  handleMove;
  handleStop;
  x;


  constructor(props) {
    super(props);
    this.initialize = this.initialize.bind(this);
    this.ROSLIBR = window.ROSLIB;
  }




  initialize() {
    // determine robot address automatically
    // robot_IP = location.hostname;
    // set robot address statically
    let robot_IP;
    robot_IP = "ws://localhost:9090";

    // // Init handle for rosbridge_websocket
    // robot ip + port need to be the same as websocket launch
    let ros;
    ros = new this.ROSLIBR.Ros({
      url: robot_IP
    });
    console.log(ros);

    // initVelocityPublisher();
  }

  render() {
        return (
            <>
                <Joystick
                  size={100}
                  baseColor="red"
                  stickColor="blue"
                  move={this.handleMove}
                  stop={this.handleStop}
                />
              <button className='btn btn-primary' onClick={this.initialize}>asdasd</button>
            </>
        );
    }
}

// function moveAction(linear, angular) {
//     if (linear !== undefined && angular !== undefined) {
//         twist.linear.x = linear;
//         twist.angular.z = angular;
//     } else {
//         twist.linear.x = 0;
//         twist.angular.z = 0;
//     }
//     cmdVel.publish(twist);
// }
//
// function initVelocityPublisher() {
//     // Init message with zero values.
//   let twist;
//   twist = new ROSLIB.Message({
//         linear: {
//             x: 0,
//             y: 0,
//             z: 0
//         },
//         angular: {
//             x: 0,
//             y: 0,
//             z: 0
//         }
//     });
//
//     // Init topic object
//   let cmdVel;
//   cmdVel = new ROSLIB.Topic({
//     ros: ros,
//     name: '/cmd_vel',
//     messageType: 'geometry_msgs/Twist'
//     });
//     // Register publisher within ROS system
//     cmdVel.advertise();
//     }
//
//

