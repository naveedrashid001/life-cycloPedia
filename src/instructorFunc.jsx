import React from "react";
import { useEffect } from "react";
const  InstructorFunc = (props)=> {

    useEffect(()=>{
        return ()=>{
            // console.log("instructor -  unmounted")
        }
    }
)

        return (
            <div>
                Name: {props.instructor.name} <br />
                Email: {propsinstructor.email}
                <br />
                Phone: {props.instructor.phone}
            </div>
        );
    
}

export default InstructorFunc;
