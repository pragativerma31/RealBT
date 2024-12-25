import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HomePage/HighlightText";
import CTAButton from "../components/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/HomePage/CodeBlocks";




const Home = () => {
    return (
        <div>
            {/*Section 1*/}
            <div className="relative mx-auto w-11/12 flex flex-col justify-between items-center text-white">
                <Link to ={"/signup"}>

                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-100 transition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-5 transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become a Broker</p>
                            <FaArrowRight/>
                        </div>
                    </div>

                </Link>
                <div className="text-center text-4xl font-semibold mt-6">
                    Find Your Dream Home
                    <HighlightText text={" Today"}/>
                </div>
                
                <div className=" font-bold text-richblack-300 text-center text-lg mt-4 w-[90%]">
                    Search for the best properties in your area
                </div> 

                <div className="flex flex-row gap-4 mt-8">
                    <div className="bg-richblack-800 p-2 rounded-full">
                        <input type="text" placeholder="Search for properties" className="bg-transparent border-none text-white w-80 p-2 focus:outline-none"/>
                    </div>
                    <div className="bg-richblack-800 p-2 rounded-full">
                        <input type="text" placeholder="Location" className="bg-transparent border-none text-white w-80 p-2 focus:outline-none"/>
                    </div>
                    <div className="bg-richblack-800 p-2 rounded-full">
                        <input type="text" placeholder="Price Range" className="bg-transparent border-none text-white w-80 p-2 focus:outline-none"/>
                    </div>
                </div>

                <div className="flex flex-row gap-4 mt-4">
                    <CTAButton active={true} linkto={"/signup"}>
                        Search
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>  

                <div className='mx-5 mt-11 shadow-blue-200'>
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>  
                
                <div>
                    <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock the power of <HighlightText text={" Real Estate "}/>
                            within your home
                        </div> 
                    }
                    subheading={"Get started with our easy to use platform"}
                    ctabtn1={
                        {
                            btnText: "Get Started",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`hello world`}
                    codeColor={"text-yellow-500"}
                    />
                </div>

            </div>
            {/*Section 2*/}
            
            {/*Section 3*/}
            {/*Footer*/}


        
        </div>
    );
}
export default Home;