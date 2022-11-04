import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AddWorkout from "./components/AddWorkout";
import CanvasView from "./components/Canvasview";
import Header from "./components/Header";
import ViewWorkouts from "./components/ViewWorkout";


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
  <Routes>
    <Route path="/" element={<ViewWorkouts />} />
    <Route path="add" element={<AddWorkout/>} />
    <Route path="graph" element={<CanvasView/>} />
  </Routes>
    </BrowserRouter>
  );
}
