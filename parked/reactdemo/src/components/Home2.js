import React from 'react';
import '../assets/css/test.css'

class Home2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            msg:'i am a home2 component',
            title:'i am a title',
            color:'red',
            style:{
                color:'red',
                fontSize:'40px'
            }
        }
    }

    render(){
        return(
            <div>
                <h2>
                    {this.state.msg}
                </h2>
                <div title="1111">i am a div</div>

                <br />
                <div title={this.state.msg}>i am a div</div>
                <div className='red' title={this.state.msg}>i am a red div</div>
                <div className={this.state.color} title={this.state.msg}>i am a red div</div>
                <br/>
                <label htmlFor='name'>name</label>
                <input id='name'/>
                <br/>
                <div style={{"color":"red"}}>i am a red div inline!!</div>
                <br/>
                <div style={this.state.style}>i am a red div</div>
            </div>
        )
    }
}

export default Home2;