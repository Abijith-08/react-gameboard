import React, { Component } from "react";
import Tile from "./Tile"

// Function that takes the expected number of rows and columns as arguments,
// then generates a checkered tile grid to the given specifications.
function tileFactory(rowNumber, colNumber) {

    // Raise a flag when the colNumber is even
    let isEven = (colNumber % 2 === 0) ? true : false

    // Generate an array of color values that alternate between black (#000000) and white (#FFFFFF)
    var colorArray = [];
    let tileMarker = "A"
    let colorEntry = ""
    if (isEven) {
        // Even number of tiles per row, sequence must switch according to row type
        let rowType = "A"
        for (var j = 0; j < rowNumber; j++) {
            if (rowType === "A") {
                // Row type "A" will follow the normal white-black sequence of colours
                for (var i = 0; i < colNumber; i++) {
                    if (tileMarker === "A") {
                        colorEntry = "#FFFFFF"
                        tileMarker = "B"
                    } else {
                        colorEntry = "#000000"
                        tileMarker = "A"
                    }

                    colorArray.push(colorEntry)
                }
                rowType = "B"
            } else {
                // Row type "B" must follow a reversed black-white sequence
                for (var i = 0; i < colNumber; i++) {
                    if (tileMarker === "A") {
                        colorEntry = "#000000"
                        tileMarker = "B"
                    } else {
                        colorEntry = "#FFFFFF"
                        tileMarker = "A"
                    }

                    colorArray.push(colorEntry)
                }
                rowType = "A"
            }
        }
    } else {
        // Odd number of tiles per row, so same white-black sequence throughout
        for (var j = 0; j < rowNumber; j++) {
            for (var i = 0; i < colNumber; i++) {

                if (tileMarker === "A") {
                    colorEntry = "#FFFFFF"
                    tileMarker = "B"
                } else {
                    colorEntry = "#000000"
                    tileMarker = "A"
                }

                colorArray.push(colorEntry)
            }
        }
    }

    // Use the array of colors values to generate an array of checkered tiles
    var tileArray = [];
    for (var i = 0; i < colorArray.length; i++) {
        tileArray.push(<Tile tileColor={colorArray[i]}/>);
    }

    // Group the tiles into their correct rows
    let finalArray = []
    let rowArray = []
    for (var i = 0; i < tileArray.length+1; i++) {

        // Condition executes when the end of the row is reached
        if ((i % colNumber === 0) && (i !== 0)) {

            // log the current row to the final array
            finalArray[i] = [
                <div>
                    {rowArray}
                </div>
            ]

            // reset row array
            rowArray = []
        
        }

        rowArray[i] = tileArray[i]

    }

    return finalArray
}

// Main Board component that holds the tiles
class Board extends Component {
    render() {
        var boardStyle = {
        height: 520,
        width: 480,
        backgroundColor: "#855E42",
        padding: "5px 5px 5px 5px",
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        filter: "drop-shadow(0px 0px 5px #666)"
        };
    
        return (
            <div style={boardStyle}>
                {tileFactory(8,8)}
            </div>
        );
    }
}

export default Board;