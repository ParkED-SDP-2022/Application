import React from 'react';
import map1 from '../assets/images/park-map.jpg';
import buttonup from '../assets/images/up.png';
import buttondown from '../assets/images/down.png';

import '../assets/css/index.css'

class Map extends React.Component{
    constructor(props){
        super(props);

        this.state={
            msg:'map'
        }
    }

    render(){
        return(
            <div>
                <div className='map'>
                    <img src={map1}></img>
                    <br/>
                    {this.state.msg}
                    <hr/>
                </div>
                <div>
                    <img src={buttonup}></img>
                    <img src={buttondown}></img>
                </div>
                

            </div>
            
        )
    }
}

export default Map;