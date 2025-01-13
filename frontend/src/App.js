import "./App.css";
import { Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPass from "./pages/ForgetPass";
import UpdatePass from "./pages/UpdatePass";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/forgot-password" element = {<ForgetPass/>} />
        <Route path="/update-password/:id" element = {<UpdatePass/>} />
      </Routes>

    </div>
  );
}

export default App;
