

class RosConnection {
    
    constructor() {

        // determine robot address automatically
        // robot_IP = location.hostname;
        // set robot address statically
        this.ROSLIBR = window.ROSLIB;
        this.KEYBOARDTELEOP = window.KEYBOARDTELEOP

        this.robot_IP = "ws://localhost:9090";

        // Init handle for rosbridge_websocket
        // robot ip + port need to be the same as websocket launch
        this.ros = new this.ROSLIBR.Ros({
            url: this.robot_IP
        });

        this.initVelocityPublisher();
        this.initTeleopKeyboard();
        this.initOdomTopic();

    }

    checkConnection(){
        this.ros.on('connection', function() {
            console.log('Connected to websocket server.');
        });
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

}


export default RosConnection;