import React, { Component } from "react";

// Individual tile component
// Color must be specified
class Tile extends Component {
    render() {
        var tileStyle = {
        height: 50,
        width: 50,
        // The backgroundColor property will be defined upon Tile creation
        backgroundColor: this.props.tileColor,
        margin: "5px 5px 5px 5px",
        display: "inline-block",
        // The float property removes the element from the normal flow of the page
        // This means that any other text or inline elements close to it will wrap around it
        // In this case, it's used to prevent the element from changing position when something
        // is rendered inside it
        float: "left"
        };
    
        return (
            <div style={tileStyle}>
                {this.props.children}
            </div>
        );
    }
}

export default Tile;