import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/HomePage/HighlightText";
import CTAButton from "../components/HomePage/Button";
import Banner from "../assets/Images/Banner.png";
import CodeBlocks from "../components/HomePage/CodeBlocks";
import TimeLineSection from "../components/HomePage/TimeLineSection";
import LearningSection from "../components/HomePage/LearningSection";
import BankerSection from "../components/HomePage/BankerSection";
import ExploreMore from "../components/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import SearchForm from "../components/HomePage/SearchForm";
import { useRef } from "react";


const Home = () => {
    const formRef = useRef(null);

    const handleFormSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit(); // Programmatically submit the form
        }
    };
    return (
        <div>
            {/*Section 1*/}
            <div className="relative mx-auto w-11/12 flex flex-col justify-between items-center text-white ">
                <div className="text-center text-4xl font-semibold mt-10">
                    Find Your Dream Home
                    <HighlightText text={" Today"} />
                </div>

                <div className=" font-bold text-richblack-300 text-center text-lg mt-4 w-[90%]">
                    Search for the best properties in your area
                </div>

                {/* Use SearchForm Component */}
                <SearchForm ref={formRef} />

                {/* Button to Trigger Form Submission */}
                <div className="flex flex-row gap-4 mt-4">
                    <CTAButton active={true} linkto="#" onClick={handleFormSubmit}>
                        Search
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Visit
                    </CTAButton>
                </div>
                
                <div className="w-[1200px] h-[515px] mx-3 my-7 shadow-[0_0_50px_-10px] shadow-blue-100 mt-10 bg-richblack-25">
                    <img src={Banner} alt="Banner" className="shadow-[20px_20px_rgba(255,255,255)] w-[1200px] h-[515px]" ></img>
                </div>


                {/*codeSection 1*/}
                <div className="w-[90%]  mt-8">
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock the power of <HighlightText text={" Real Estate "} />
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

                {/*codeSection 2*/}
                <div className="w-[90%]">
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock the power of <HighlightText text={" Real Estate "} />
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
                <ExploreMore />

            </div>
            {/*Section 2*/}
        
            <div className="bg-pure-greys-5 text-richblack-900">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5  mx-auto">
                        <div className="h-[150px] "></div>
                        <div className="flex flex-row gap-7 mt-5 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex gap-2 items-center">
                                    Explore full catalog
                                    <FaArrowRight />
                                </div>

                            </CTAButton>

                            <CTAButton active={false} linkto={"/login"}>
                                Learn More
                            </CTAButton>

                        </div>

                    </div>

                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5">
                    <div className="flex flex-row gap-7 mb-10 mt-[100px]">
                        <div className="text-4xl font-semibold w-[45%]">
                            Get the best deals on
                            <HighlightText text={" Properties in your Area "} />
                        </div>

                        <div className="flex flex-col gap-10 w-[40%] items-start">
                            <div>
                                The modern RealBT is the digital platform that connects you to the broker and banker in a single click

                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Get Started Now
                            </CTAButton>
                        </div>
                    </div>
                    <TimeLineSection />

                    <LearningSection />

                </div>
            </div>
            {/*Section 3*/}
            <div className="w-11/12 mx-auto flex flex-col items-center justify-betweeen gap-5 max-w-maxContent bg-richblack-800 text-white">

                <BankerSection />
                <h2 className="text-center text-4xl font-semibold mt-10">Review from others</h2>
                {/*Review Section*/}

            </div>



            {/*Footer*/}
            <Footer />



        </div>
    );
}
export default Home;