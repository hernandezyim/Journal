import { createRoot } from "react-dom/client";

import JournalApp from "./JournalApp";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<JournalApp />);
