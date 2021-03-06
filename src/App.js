import React, { Component } from "react";
import Tile from "./Tile";

// Function that generates an array of colour values representing a checkered grid
function checkedGrid(rowNumber, colNumber) {

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

    return colorArray
}

// Function that groups the tiles in the tileArray into sub-arrays for each row
// This is only needed for the grid to render correctly, so it can be called just before rendering
function tileGrouper(tileArray, colNumber) {
    // Group the tiles into sub-arrays, each containing a row housed within its own div container
    let finalArray = []
    let rowArray = []
    let rowCount = 0
    for (var i = 0; i < tileArray.length+1; i++) {

        // Condition executes when the end of a row is reached
        if ((i % colNumber === 0) && (i !== 0)) {

            // log the current row to the final array
            finalArray[rowCount] = [
                <div>
                    {rowArray}
                </div>
            ]

            // reset row array
            rowArray = []

            // Increment rowCount by one
            rowCount += 1
        
        }

        rowArray[i] = tileArray[i]

    }

    return finalArray
}

class App extends Component {

    // This is the app's state. Updating it with setState() will cause re-rendering of the app
    // with the updated state information
    state = {
        // Initial state information about the individual pieces. The "category" determines where 
        // each piece is rendered, and it should be updated by the dropHandler() function
        pieces: [
            {name:"Piece A", category:"tile5", bgcolor: "black"},
            {name:"Piece B", category:"tile1", bgcolor: "black"}
        ]
    }

    render() {

        var appStyle = {
            height: 520,
            width: 480,
            backgroundColor: "#00FF00",
            padding: "5px 5px 5px 5px",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)",
        };

        // The rows and columns expected for the checkered grid are passed in as arguments
        let rows = this.props.rows
        let columns = this.props.columns

        // Use the checkedGrid() function to generate the array of alternating colour values for the tiles
        let colourGrid = checkedGrid(rows, columns)

        // Create a "containers" variable that indicates where the pieces should be rendered,
        // either off-board or inside one of the tiles
        let containers = {
            offBoard: []
        }

        // Push a key-value pair into the "containers" variable for each tile
        for (var i = 1; i < colourGrid.length; i++) {
            // Programmatically generate the key name according to the tile number
            let containerName = `tile${i}`
            containers[containerName] = []
        }

        // Use the Tile element along with the array of alternating colour values in colourGrid
        // to create a 1D array of tile objects with alternating colours
        var tileArray = [];
        for (var i = 0; i < colourGrid.length; i++) {
            let tileName = `tile${i+1}`
            tileArray.push(
                <Tile 
                    key={i}
                    keyProp={i}
                    tileColor={colourGrid[i]}
                >
                    {containers[tileName]}
                </Tile>
            );
        }
        
        // For each piece specified in the initial state-object, generate an appropriate container
        // and push it into the key-value pair of "containers"
        this.state.pieces.forEach(

            (t) => {
                
                containers[t.category].push(

                    //<div key={t.name}>
                        t.name
                    //</div>
                
                )
            }
        )

        // Group the tiles into their respective rows for correct rendering
        var finalArray = tileGrouper(tileArray, columns)

        return (
            <div style={appStyle}>
            
                {finalArray}

                <div>
                    {containers.offBoard}
                </div>
            
            </div>
        );
    
    }
}

export default App;