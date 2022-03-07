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

    handleInstruction() {
        const long = this.props.loc.long;
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
        console.log(this.props)
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
            <h1>Move a Bench:</h1>
            <form>
                {content.inputs.map((input,key) => {
                    return (
                        <div key={key}>
                            <p>
                                <label className='label'>{input.label}</label>
                            </p>
                            <p>
                                <input name={input.name} value={input.val} readOnly={true} className="input"/>
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

// function Form({ benchID, loc }) {

//     const content = {
//         inputs: [
//             {
//                 label: 'Bench Number',
//                 name: 'bench number',
//                 val: benchID,
//             },
//             {
//                 label: 'Longitude',
//                 name: 'new longitude',
//                 val: loc,
//             },
//         ],
//     };

//     return (
//         <>
//         <h1>Move a Bench:</h1>
//         <form>
//             {content.inputs.map((input,key) => {
//                 return (
//                     <div key={key}>
//                         <p>
//                             <label className='label'>{input.label}</label>
//                         </p>
//                         <p>
//                             <input name={input.name} value={input.val} readOnly={true} className="input"/>
//                         </p>
//                     </div>
//                 );
//             })}
//             <button className='green_button' type='submit'>Submit</button>
//         </form>
//         </>
//     )
// }

// export default Form;