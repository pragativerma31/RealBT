import "./App.css";
import { Route , Routes } from "react-router-dom";
import { useSelector } from "react-redux";


import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import Settings from "../src/components/core/Dashboard/Settings/settings"
import MyProfile from "./components/core/Dashboard/MyProfile"
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProperties from "./components/core/Dashboard/BrokerProperties/MyProperties";
import AddProperty from "./components/core/Dashboard/AddProperty/index";
import AddLoanApplication from "./components/core/Dashboard/AddLoanApplication";
import MyLoanApplication from "./components/core/Dashboard/CustomerApplication/MyLoanApplication";
import PropertyCatalog from "./pages/PropertyCatalog";
import LoanApplicationCatalog from "./pages/ApplicationCatalog";
import LoanOffersCatalog from "./pages/LoanOffersCatalog";
import AddLoanOffer from "./components/core/Dashboard/AddloanOffer/index";
import MyLoanOffers from "./components/core/Dashboard/BankersOffers/MyLoanOffers";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element = {<Signup/>} />
        <Route path="/forgot-password" element = {<ForgotPass/>} />
        <Route path="/password/reset-password/:resetToken" element = {<ResetPass/>} />
        <Route path="/verify-email" element={<VerifyEmail/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
          {/* Route for all users */}
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/Settings" element={<Settings />} />
          <Route path="/dashboard/add-property" element={<AddProperty />} />
          <Route path="/dashboard/my-properties" element={<MyProperties />} />
          <Route path="/dashboard/add-loan-application" element={<AddLoanApplication/>} />
          <Route path="/dashboard/my-loan-applications" element={<MyLoanApplication />} />
          <Route path="/loanOffers/property/:propertyID/add-loan-offer" element={<AddLoanOffer />} />
          <Route path="/loanOffers/loanapplication/:loanApplicationID/add-loan-offer" element={<AddLoanOffer />} />
          <Route path="/dashboard/my-loan-offers" element={<MyLoanOffers />} />
        </Route>
        <Route path="/properties" element={<PropertyCatalog/>}/>
        <Route path="/loanApplications" element={<LoanApplicationCatalog/>}/>
        <Route path ="/properties/:propertyID/loan-offers" element={<LoanOffersCatalog/>}/>
        <Route path = "/loan-applications/:loanApplicationID/loan-offers" element={<LoanOffersCatalog/>}/>
      </Routes>

    </div>
  );
}

export default App;
