import Instructor from "./instructor";
import { getRandom } from "./utility/api";
import React from "react";

class CycleOpediaClassPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(localStorage.getItem("cyclopedia")) || {
            instructor: null, // Initialize as null
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
            inputName: "",
            inputFeedback: "",
        };
    }

    componentDidMount = async () => {
        // console.log("component Did Mount");
        if (!JSON.parse(localStorage.getItem("cyclopedia"))) {
            const response = await getRandom();
            // console.log(response);
            this.setState({
                instructor: {
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                },
            });
        }
    };

    componentDidUpdate = async (prevprops, prevstate) => {
        // console.log("component Did Update");
        localStorage.setItem("cyclopedia", JSON.stringify(this.state));
        // console.log("old state ", prevstate.studentCount);
        // console.log("new state ", this.state.studentCount);

        if (prevstate.studentCount < this.state.studentCount) {
            const response = await getRandom();
            this.setState((prevstate) => ({
                studentList: [
                    ...prevstate.studentList,
                    {
                        name: response.data.first_name + " " + response.data.last_name,
                    },
                ],
            }));
        } else if (prevstate.studentCount > this.state.studentCount) {
            this.setState({
                studentList: [],
            });
        }
    };

    componentWillUnmount = () => {
        // console.log("component Did UnMount");
    };

    handleAddStudent = () => {
        this.setState((prevstate) => ({
            studentCount: prevstate.studentCount + 1,
        }));
    };

    handleRemoveAddStudent = () => {
        this.setState({
            studentCount: 0,
        });
    };

    handleToggleInstructor = () => {
        this.setState((prevstate) => ({
            hideInstructor: !prevstate.hideInstructor,
        }));
    };

    render() {
        // console.log("Render component");
        return (
            <div>
                <div className="p-3">
                    <span className="h4 text-success">Instructor</span>{" "}
                    <i
                        className={`bi ${
                            this.state.hideInstructor
                                ? "bi-toggle-off text-danger"
                                : "bi-toggle-on text-success"
                        }`}
                        onClick={this.handleToggleInstructor}
                    ></i>
                    <br />
                    {!this.state.hideInstructor ? (
                        <Instructor instructor={this.state.instructor} />
                    ) : null}
                </div>
                <div className="p-3">
                    <span className="h4 text-success">FeedBack</span>
                    <br />
                    <input
                        type="text"
                        value={this.state.inputName}
                        placeholder="Name..."
                        onChange={(e) => {
                            this.setState({ inputName: e.target.value });
                        }}
                    />{" "}
                    value: {this.state.inputName}
                    <br />
                    <textarea
                        type="text"
                        value={this.state.inputFeedback}
                        placeholder="Feedback..."
                        onChange={(e) => {
                            this.setState({ inputFeedback: e.target.value });
                        }}
                    ></textarea>{" "}
                    value: {this.state.inputFeedback}
                </div>
                <div className="p-3">
                    <span className="h4 text-success">Students</span>
                    <br />
                    students Count: {this.state.studentCount} <br />
                    <button
                        onClick={this.handleAddStudent}
                        className="btn btn-success btn-sm"
                        style={{ marginRight: "5px" }}
                    >
                        Add Student
                    </button>
                    <button
                        onClick={this.handleRemoveAddStudent}
                        className="btn btn-danger btn-sm"
                    >
                        Remove All Students
                    </button>
                    {this.state.studentList.map((student, index) => (
                        <div className="text-white" key={index}>
                            - {student.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CycleOpediaClassPage;
