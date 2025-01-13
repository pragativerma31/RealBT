import "./App.css";
import { Route , Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import UpdatePass from "./pages/UpdatePass";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/forgot-password" element = {<ForgotPass/>} />
        <Route path="/update-password/:id" element = {<UpdatePass/>} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
      </Routes>

    </div>
  );
}

export default App;
