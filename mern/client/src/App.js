import React from "react";
 
// desc: We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// desc: We import all the components we need in our app
import Navbar from "./components/navbar";
import PoseList from "./components/poseList";
import Edit from "./components/edit";
import Create from "./components/create";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<PoseList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;