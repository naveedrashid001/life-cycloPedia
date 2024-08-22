import React from "react";

class Instructor extends React.Component {
    

    componentDidUpdate() {
        console.log("component - update");
    }

    componentDidMount() {
        console.log("component - Mount");
    }

    componentWillUnmount() {
        console.log("component - UnMount");
    }

    render() {
        console.log("render - Instructor");

        return (
            <div >
                
                Name: {this.props.instructor.name} <br />
                Email: {this.props.instructor.email}
                <br />
                Phone: {this.props.instructor.phone}
            </div>
        );
    }
}

export default Instructor;
