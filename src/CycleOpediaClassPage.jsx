import { getRandom } from "./utility/api";
import React from "react";

class CycleOpediaClassPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            instructor:undefined,
            studentList:[],
            studentCount:0,
            hideInstructor:false
         }

    }
    componentDidMount =async ()=>{
        console.log("component Did Mount")
        const response = await getRandom();
        console.log(response)
        this.setState((prevstate)=>{
            return {
                instructor:{
                    name :response.data.first_name +" "+ response.data.first_name,
                    email :response.data.email,
                    phone :response.data.phone_number,
                }
            }
        })
        // return <div>this.instructor</div>
        }
    
    componentDidUpdate=()=>{
        console.log("component Did Update")
    }
    componentDidUnMount=()=>{
        console.log("component Did Un Mount")
    };
    //  add student button 
    HandleAddStudent =()=>{
        this.setState((prevstate)=>{
            return {
                studentCount : prevstate.studentCount+1
            }
        })
    }
        //  remove all student button 
    HandleRemoveAddStudent =()=>{
        this.setState((prevstate)=>{
            return {
                studentCount :0
            }
        })
    }

    render(){
    console.log("Render component");
    return (<div>
        {
            this.state.instructor && (
                <div className="p-3">
                   <span className="h4 text-success">instructor</span> 
                   <i className="bi bi-toggle-on"></i>
                   <br />
                   Name: {this.state.instructor.name} <br />
                   Email: {this.state.instructor.email}
                   <br />
                   Phone: {this.state.instructor.phone}
                </div>
            ) }

<div className="p-3">
                   <span className="h4 text-success">Students</span>
                   <br />
                   students Count: {this.state.studentCount} <br />
                   <button onClick={()=>this.HandleAddStudent()} className="btn btn-success btn-sm " style={{marginRight:"5px"}}> Add Student</button>
                   
                   <button onClick={()=>this.HandleRemoveAddStudent()} className="btn btn-danger btn-sm"> Remove All Students</button>
                </div>

    </div>)
    }
}

export default CycleOpediaClassPage;