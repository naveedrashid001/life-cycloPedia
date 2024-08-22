import Instructor from "./instructor"
import { getRandom } from "./utility/api";
import React from "react";

class CycleOpediaClassPage extends React.Component{

    constructor(props){
        super(props);
        this.state= JSON.parse(localStorage.getItem("cyclopedia")) || {
            instructor:undefined,
            studentList:[],
            studentCount:0,
            hideInstructor:false,
            inputName:"",
            inputFeedback:"",
         }

    }
    componentDidMount =async ()=>{
        console.log("component Did Mount")
        if(JSON.parse(localStorage.getItem("cyclopedia") )){
            // this.setState(JSON.parse(localStorage.getItem("cyclopedia")));
        } else {
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
        }
    
    componentDidUpdate=()=>{
        console.log("component Did Update")
        localStorage.setItem("cyclopedia",JSON.stringify(this.state));
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
            this.state.instructor &&  <Instructor instructor={this.state.instructor} />
            }

                  {/* inputfeedback */}
                  <div className="p-3">
                   <span className="h4 text-success">FeedBack</span>
                   <br />
                   <input type="text" value={this.state.inputName}  placeholder="Name..."
                   onChange={(e)=>{
                    this.setState({inputName: e.target.value})
                   }}/>  {" "}
                   value: {this.state.inputName}
                   <br />
                   <textarea type="text" value={this.state.inputFeedback}  placeholder="Feedback..."
                   onChange={(e)=>{
                    this.setState({inputFeedback: e.target.value})
                   }}></textarea>  {" "}
                   value: {this.state.inputFeedback}
                   </div>


                   {/* student */}
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