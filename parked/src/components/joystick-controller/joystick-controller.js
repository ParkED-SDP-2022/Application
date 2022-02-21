import React from "react";
import "./joystick-controller.scss"
import {Joystick} from "react-joystick-component";
import RosConnection  from "../ros-connection/ros-connection";


export class JoystickController extends React.Component{

  MAX_LINEAR_SPEED = 0.26
  MAX_ANGULAR_SPEED = 1.82
  MAX_JOYSTICK_X_Y = 50

  ros;
  //twist;

  publishImmidiately = true;
  robot_IP;
  
  constructor(props) {
    super(props);
    this.state = {
      showJoyStick: true
    }

    // this.initialize = this.initialize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.toggleJoystick = this.toggleJoystick.bind(this);
    // this.initVelocityPublisher = this.initVelocityPublisher.bind(this)
    // this.moveAction = this.moveAction.bind(this)
    
  }

  componentDidMount() {
    this.ros = new RosConnection();
    this.ros.checkConnection();

  }

  // When the component is taken out of DOM, we should cancel the connection in this lifecycle method
  componentWillUnmount() {

  }

  handleMove(evt) {
    const changeX = evt.x;
    const changeY = evt.y;

    const linearSpeed = (changeY / this.MAX_JOYSTICK_X_Y) * this.MAX_LINEAR_SPEED;
    const angularSpeed = - (changeX / this.MAX_JOYSTICK_X_Y) * this.MAX_ANGULAR_SPEED;
    if (this.publishImmidiately) {
      this.publishImmidiately = false;
      this.moveAction(linearSpeed, angularSpeed);
      setTimeout(() => {
        this.publishImmidiately = true;
      }, 50);
    }
  }

  handleStop() {
    this.moveAction(0, 0);
  }

  moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
      this.ros.twist.linear.x = linear;
      this.ros.twist.angular.z = angular;
    } else {
      this.ros.twist.linear.x = 0;
      this.ros.twist.angular.z = 0;
    }
    this.ros.cmdVel.publish(this.ros.twist);
  }

  parseMessage(message){
    console.log('Received message on ' + this.ros.odom.name + ': x:' + message.pose.pose.position.x + ' y:' + message.pose.pose.position.y);
    this.ros.odom.unsubscribe();
  }

  odomCall(){
    this.ros.odom.subscribe(this.parseMessage);

  }

  toggleJoystick() {
    this.setState({showJoyStick: !this.state.showJoyStick});
    console.log(this.state)
  }

  render() {
        return (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              {this.state.showJoyStick && <div className='mb-4 d-flex flex-column justify-content-center align-items-center'>
                <p className='display-6 mb-5' >Joystick</p>
                <Joystick
                  size={100}
                  baseColor="green"
                  stickColor="darkgreen"
                  move={this.handleMove}
                  stop={this.handleStop}
                />
              </div>}
              {!this.state.showJoyStick && <p className="ArrowKeyText">
                Use w, a, s, d on your keyboard to control the robot
              </p> }
              <button className='green_button' onClick={this.toggleJoystick}>
                {this.state.showJoyStick && "Hide Joystick"}
                {!this.state.showJoyStick && "Show Joystick"}
              </button>
            </div>
        );
    }
}






