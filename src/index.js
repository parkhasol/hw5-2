import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ShowList from "./components/Pages/ShowList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const myComponent = <ShowList />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myComponent);

