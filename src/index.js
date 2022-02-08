import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import App from "./App";

ReactDOM.render(
    <App rows={8} columns={8}/>, 
    document.getElementById("root")
);