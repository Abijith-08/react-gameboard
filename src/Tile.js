import React, { Component } from "react";

// Individual tile component
// Color must be specified
class Tile extends Component {
    render() {
        var tileStyle = {
        height: 50,
        width: 50,
        backgroundColor: this.props.tileColor,
        margin: "5px 5px 5px 5px",
        display: "inline-block"
        };
    
        return (
            <div style={tileStyle}></div>
        );
    }
}

export default Tile;