import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Calender from "./pages/Calender";
import Registeration from "./pages/registerationPage/registeration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registeration />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </>
  );
}

export default App;
