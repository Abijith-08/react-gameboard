import React, { Component } from "react";
import { TileWrapper } from "./styles";

// Individual tile component
// Color must be specified
class Tile extends Component {
    render() {
        return (
            <TileWrapper tileColor={this.props.tileColor}>
                {this.props.children}
            </TileWrapper>
        );
    }
}

export default Tile;