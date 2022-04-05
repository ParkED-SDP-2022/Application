import React from "react";
import RosConnection, { instructionAction }  from "../ros-connection/ros-connection";


export default class Form extends React.Component{

    ros;
    publishImmidiately = true;
    
    constructor(props) {
        super(props);
        this.handleInstruction = this.handleInstruction.bind(this);
    }

    componentDidMount() {
        this.ros = new RosConnection();
        this.ros.checkConnection();
    }

    // When the component is taken out of DOM, we should cancel the connection in this lifecycle method
    componentWillUnmount() {}

    handleInstruction(e) {
        e.preventDefault();

        var points_list = [];
        for (const i in this.props.locations){
            var point = {
                long: this.props.locations[i].long,
                lat: this.props.locations[i].lat,
                angle: -999,
            }
            points_list.push(point);
        }
        console.log("instruction:" + points_list);

        //TODO: create this ros action
        this.ros.multiBenchSimulationAction(points_list);

    }

    render() {
        return (
            <>
            <h2>Move a Bench:</h2>
            <form className="FormInputs">
                {this.props.content.inputs.map((input,key) => {
                    return (
                        <div key={key} className="form-group mw-100 mh-100">
                            <p>
                                <label className='label'>{input.label}</label>
                            </p>
                            <p>
                                <input name={input.name} value={input.val} readOnly={true} className="input form-control"/>
                            </p>
                        </div>
                    );
                })}
                <button className='green_button' type='submit' onClick={this.handleInstruction}>Submit</button>
            </form>
            </>
        )
    }
}