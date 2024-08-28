import Instructor from "./instructor";

import { getRandom } from "./utility/api";
import React, { useEffect, useRef, useState } from "react";

const CycleOpediaFuncPagee = () => {

    const [state, setState] = useState({
        instructor: null, // Initialize as null
        studentList: [],
        studentCount: 0,
        hideInstructor: false,
    });

    const [inputName, setInputName] = useState("");
    const [inputFeedback, setInputFeedback] = useState("");
    // const [totaRender, settotaRender] = useState(0);
    const totaRender = useRef(0);
    const prevStudentCount = useRef(0);




    useEffect(()=>{
        // settotaRender((prevState)=> prevState + 1,
    // console.log("total Render"+ settotaRender))
    totaRender.current = totaRender.current + 1 
    })

    // for Instructor
    useEffect(() => {
        // console.log("this will be called on first render");
    
        const getUser = async () => {
            const response = await getRandom();
            setState((prevState) => ({
                ...prevState, // Spread previous state to retain all other properties
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                },
            }));
        };
    if (state.hideInstructor){
        getUser();
    }
}, 
[state.hideInstructor]);

//  for to add student 

useEffect(() => {
    // console.log("this will be called on first render");

    const getUser = async () => {
        const response = await getRandom();
        setState((prevState) => ({
            ...prevState, // Spread previous state to retain all other properties
            studentList: [
                ...prevState.studentList, 
                {
                    name: response.data.first_name + " " + response.data.last_name,
                }
            ]
        }));
    };
if (prevStudentCount.current < state.studentCount){
    getUser();
}   else if (prevStudentCount.current > state.studentCount){
    setState((prevState)=>{
        return {...prevState, studentList: []}
    })
} 
}, 
[state.studentCount, state.studentList]);
    
useEffect(()=>{
    // settotaRender((prevState)=> prevState + 1,
// console.log("total Render"+ settotaRender))
prevStudentCount.current = state.studentCount 
},[state.studentCount]) 

    useEffect(()=>{
        // console.log("this will be called on update")
    },[inputName, inputFeedback])

    useEffect(()=>{
        // console.log("this will be called on initial/ first render/ unmounted")
        return ()=>{
            // console.log("this will be called when the component is unmounted")
        }
    }
)


    const handleAddStudent = () => {
        setState(prevState => ({
            ...prevState,
            studentCount: prevState.studentCount + 1,
        }));
    };

    const handleRemoveAllStudents = () => {
        setState(prevState => ({
            ...prevState,
            studentCount: 0,
            studentList: []
        }));
    };

    const handleToggleInstructor = () => {
        setState(prevState => ({
            ...prevState,
            hideInstructor: !prevState.hideInstructor,
        }));
    };

    return (
        <div>
            <div className="p-3">
                <span className="h4 text-success">Instructor</span>{" "}
                <i
                    className={`bi ${
                        state.hideInstructor
                            ? "bi-toggle-off text-danger"
                            : "bi-toggle-on text-success"
                    }`}
                    onClick={handleToggleInstructor}
                ></i>
                <br />
                {!state.hideInstructor ? (
                    <Instructor instructor={state.instructor} />
                ) : null}
            </div>
            <div className="p-3">
            <span className="h6">Total Render: {totaRender.current}</span> <br />

                <span className="h4 text-success">FeedBack</span>
                <br />
                <input
                    type="text"
                    value={inputName}
                    placeholder="Name..."
                    onChange={(e) => setInputName(e.target.value)}
                />{" "}
                value: {inputName}
                <br />
                <textarea
                    value={inputFeedback}
                    placeholder="Feedback..."
                    onChange={(e) => setInputFeedback(e.target.value)}
                ></textarea>{" "}
                value: {inputFeedback}
            </div>
            <div className="p-3">
                <span className="h4 text-success">Students</span>
                <br />
                students Count: {state.studentCount} <br />
                <button
                    onClick={handleAddStudent}
                    className="btn btn-success btn-sm"
                    style={{ marginRight: "5px" }}
                >
                    Add Student
                </button>
                <button
                    onClick={handleRemoveAllStudents}
                    className="btn btn-danger btn-sm"
                >
                    Remove All Students
                </button>
                {state.studentList.map((student, index) => (
                    <div className="text-white" key={index}>
                        - {student.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CycleOpediaFuncPagee;
