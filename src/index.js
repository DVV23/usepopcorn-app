import React from "react";
import ReactDOM from "react-dom/client";
//import TestApp from "./TestApp";
import "./index.css";
//import App from "./App";
import NewApp from "./NewApp";
//import GeoApp from "./GeoApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NewApp />);
//root.render(<GeoApp />);
//root.render(<TestApp />);
// root.render(
//   <div>
//     <StarRating
//       maxRating={5}
//       messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
//     />
//     <StarRating
//       maxRating={5}
//       size={24}
//       color="red"
//       defaultRating={3}
//     />
//   </div>
// );
