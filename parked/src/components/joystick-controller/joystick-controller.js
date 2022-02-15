import React from "react";
import "./joystick-controller.scss"
import {Joystick} from "react-joystick-component";

export class JoystickController extends React.Component{
  MAX_LINEAR_SPEED = 0.26
  MAX_ANGULAR_SPEED = 1.82
  MAX_JOYSTICK_X_Y = 50

  ROSLIBR
  KEYBOARDTELEOP
  ros;
  twist;
  cmdVel;
  publishImmidiately = true;
  robot_IP;
  manager;
  teleop;
  odom;


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
    this.ROSLIBR = window.ROSLIB;
    this.KEYBOARDTELEOP = window.KEYBOARDTELEOP
  }

  componentDidMount() {
    this.initialize();
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

  initialize() {
    // determine robot address automatically
    // robot_IP = location.hostname;
    // set robot address statically
    let robot_IP;
        robot_IP = "ws://localhost:9090";

    // // Init handle for rosbridge_websocket
    // robot ip + port need to be the same as websocket launch
    this.ros = new this.ROSLIBR.Ros({
      url: robot_IP
    });

    this.initVelocityPublisher();
    this.initTeleopKeyboard();
    this.initOdomTopic();
  }

  initVelocityPublisher() {
    // Init message with zero values.
    this.twist = new this.ROSLIBR.Message({
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
    this.cmdVel = new this.ROSLIBR.Topic({
      ros: this.ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });
    // Register publisher within ROS system
    this.cmdVel.advertise();
  }

  initTeleopKeyboard() {
    // Use w, s, a, d keys to drive your robot

    // Check if keyboard controller was aready created
    if (this.teleop == null) {
      // Initialize the teleop.
      this.teleop = new this.KEYBOARDTELEOP.Teleop({
        ros: this.ros,
        topic: '/cmd_vel'
      });
    }

    // Add event listener for slider moves
    const robotSpeedRange = this.MAX_LINEAR_SPEED;
    // robotSpeedRange.oninput = function () {
    //   this.teleop.scale = robotSpeedRange.value / 100
    // }
  }

  moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
      this.twist.linear.x = linear;
      this.twist.angular.z = angular;
    } else {
      this.twist.linear.x = 0;
      this.twist.angular.z = 0;
    }
    this.cmdVel.publish(this.twist);
  }

  parseMessage(message){
    console.log('Received message on ' + this.odom.name + ': x:' + message.pose.pose.position.x + ' y:' + message.pose.pose.position.y);
    this.odom.unsubscribe();
  }
  odomCall(){
    this.odom.subscribe(this.parseMessage);

  }

  initOdomTopic(){
    // Init topic object
    this.odom = new this.ROSLIBR.Topic({
      ros: this.ros,
      name: '/odom',
      messageType: 'nav_msgs/Odometry'
    });

    this.odom.advertise();
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






