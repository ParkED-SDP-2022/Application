import React from "react";
import "./joystick-controller.scss"
import {Joystick} from "react-joystick-component";

export class JoystickController extends React.Component{
  MAX_LINEAR_SPEED = 2
  MAX_ANGULAR_SPEED = 2
  MAX_JOYSTICK_X_Y = 50

  ROSLIBR
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
    // this.initialize = this.initialize.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    // this.initVelocityPublisher = this.initVelocityPublisher.bind(this)
    // this.moveAction = this.moveAction.bind(this)
    this.ROSLIBR = window.ROSLIB;
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
    else {
      console.log('publish immidiately is set to false')
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
    console.log(this.ros);

    this.initVelocityPublisher();
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

  moveAction(linear, angular) {
    console.log(linear, angular)
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
            </>
        );
    }
}






