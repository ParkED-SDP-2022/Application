import React from "react";

class News extends React.Component{
    constructor(props){
        super(props);

        this.state={
            userinfo:'bob'
        }
    }
    
    render (){
        return(
            <div>
                <h2>{this.state.userinfo}</h2>
                <ul>
                    <li>this is a table</li>
                    <li>this is a table</li>
                    <li>this is a table</li>
                </ul>
            </div>
        )
    }
}

export default News;