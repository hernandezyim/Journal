import React from "react";
import ReactDOM from "react-dom";

import { JournalApp } from "./JournalApp";
import "./styles/index.css";
import "./configs/firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

ReactDOM.render(<JournalApp />, document.querySelector("#root"));
