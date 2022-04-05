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
        //console.log('props')
        //console.log(this.props)
        const long = this.props.loc.lng;
        const lat = this.props.loc.lat;
        const angle = -999;

        var point = {
            long: long,
            lat: lat,
            angle: angle,
        }

        this.ros.instructionAction(point)

    }

    render() {
        //console.log(this.props)
        var content = {
            inputs: [
                {
                    label: 'Bench Number',
                    name: 'bench_num',
                    val: this.props.benchID,
                },
                {
                    label: 'New Location',
                    name: 'loc',
                    val: this.props.loc,
                },
            ],
        };
        return (
            <>
            <h2>Move a Bench:</h2>
            <form className="FormInputs">
                {content.inputs.map((input,key) => {
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