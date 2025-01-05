import React from "react";
import Banker from "../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";

const BankerSection = () => {
    return (
        <div className="mt-16">
            <div className="flex flex-row gap-20 items-center">
                <div className="w-[50%]">
                    <img src={Banker} alt="" className="shadow-white"></img>

                </div>
                <div className="w-[50%] flex flex-col gap-8">
                    <div className="text-4xl font-bold">
                        Become a
                        <HighlightText text={" Banker or Broker"} />
                    </div>
                    <p className="font-medium text-[16px] text-caribbeangreen-5 w-[90%]">
                        A unified platform that simplifies property search and loan matching, offering AI-powered loan comparisons tailored to customers' financial profiles for streamlined decision-making and better property-loan alignment.
                    </p>

                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"} >
                            <div className="flex flex-row gap-2 items-center">
                                Start Now!
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>

                </div>



            </div>
        </div>

    )
}
export default BankerSection;   