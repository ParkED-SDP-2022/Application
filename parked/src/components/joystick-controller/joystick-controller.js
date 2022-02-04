import React from "react";
import ReactNipple from 'react-nipple'
import 'joystick-controller.scss';
import 'roslib.min.js';

export class JoystickController extends React.Component{

    render() {
        return (
            <>
            <div>
                <ReactNipple
                    options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed red',
                        width: 150,
                        height: 150
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                        onMove={(evt, data) => console.log(evt, data)}
                    // TODO process data to extract linear and angular then and call MoveAction with these params
                    //  onMove={(evt, data) => moveAction()}
                />
            </div>
            </>
        );
    }
}

function moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }
    cmdVel.publish(twist);
}

function initVelocityPublisher() {
    // Init message with zero values.
    twist = new ROSLIB.Message({
        linear: {
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });

    // Init topic object
    cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
    });
    // Register publisher within ROS system
    cmdVel.advertise();
    }   


function initialise() {
    // determine robot address automatically
    // robot_IP = location.hostname;
    // set robot address statically
    robot_IP = "http://quilava:11311";

    // // Init handle for rosbridge_websocket
    // robot ip + port need to be the same as websocket launch
    ros = new ROSLIB.Ros({
    url: robot_IP
    });

    initVelocityPublisher();
    createJoystick();
}
