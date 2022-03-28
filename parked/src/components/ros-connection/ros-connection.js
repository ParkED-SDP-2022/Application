import {sha512} from "js-sha512";
import {ClientJS} from "clientjs";


class RosConnection {
    
    constructor() {

        // determine robot address automatically
        // robot_IP = location.hostname;
        // set robot address statically
        this.ROSLIBR = window.ROSLIB;
        this.KEYBOARDTELEOP = window.KEYBOARDTELEOP

        // need to wss if possible but requires ssl certificate
        this.robot_IP = "ws://localhost:9090";
        this.client = new ClientJS();
        

        // Init handle for rosbridge_websocket
        // robot ip + port need to be the same as websocket launch
        this.ros = new this.ROSLIBR.Ros();
        // set variable if we need authentication or not, require extra steps if true
        this.AUTHENTICATION = false;
        this.authenticateRos();

        // connect to robot 
        this.ros.connect(this.robot_IP);
        this.checkConnection();

        // Initialise ActionClient for sending Move-To-Point instructions
        this.instructionClient = new this.ROSLIBR.ActionClient({
          ros : this.ros,
          serverName : '/move_to_point',
          actionName : 'parked_custom_messages/MoveToPointAction'
        });
        this.instructionAction = this.instructionAction.bind(this);

        // Initialise Topics
        this.initVelocityPublisher();
        this.initTeleopKeyboard();
        this.initOdomTopic();
        this.initGPSTopic();

    }
    
    // reference : http://wiki.ros.org/rosauth
    // need to run rosauth node AND authenticate parameter true for rosbridge
    // to run rosbridge :: 
    // roslaunch rosbridge_server rosbridge_websocket.launch authenticate:=true
    // to run rosauth ::
    // rosrun rosauth ros_mac_authentication _secret_file_location:=/tmp/secret.txt _allowed_time_delta:=-1
    
    authenticateRos(){
      // do nothing if AUTHENTICATION == false
      if (this.AUTHENTICATION == true){
        // setup the whole key
        // secret key will be the key part of this message
        let secret = "1234567890abcdef";
        let dest = this.robot_IP;
        let rand = 'rand';
        let time = new Date().getTime() / 1000;
        let timeEnd = time + 1000
        let level = "admin"
        let mac = sha512(secret + this.client.getUserAgent() + dest + rand + parseInt(time).toString() + level + parseInt(timeEnd).toString())  // using sha512 library js-sha512 and client library clientjs
        
        this.ros.authenticate(mac, this.client.getUserAgent(), dest, rand, time, level, timeEnd)  // method from roslibjs
    
      }
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

    initGPSTopic(){
      // Init topic object
      this.gps = new this.ROSLIBR.Topic({
        ros: this.ros,
        name: '/robot_position',
        messageType: 'parked_custom_msgs/Point'
      });
  
      this.gps.advertise();
    }

    initHeatmapTopic(){
      // Init topic object
      this.gps = new this.ROSLIBR.Topic({
        ros: this.ros,
        name: '/heat_map_data',
        messageType: 'heat_map_data/String'
      });
  
      this.gps.advertise();
    }

    instructionAction(dest){
      var goal = new this.ROSLIBR.Goal({
        actionClient : this.instructionClient,
        goalMessage : {
          destination: dest
        }
      });

      goal.on('feedback', function(feedback) {
        console.log('Feedback: ' + feedback.sequence);
      });

      goal.on('result', function(result) {
        console.log('Final Result: ' + result.sequence);
      });

      this.ros.on('connection', function() {
        console.log('Connected to websocket server.');
      });

      this.ros.on('error', function(error) {
        console.log('Error connecting to websocket server: ', error);
      });
      
      this.ros.on('close', function() {
        console.log('Connection to websocket server closed.');
      });
       
      goal.send();
    }
}


export default RosConnection;