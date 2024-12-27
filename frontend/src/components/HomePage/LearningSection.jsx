import React from "react";
import HighlightText from "./HighlightText";
import know from "../../assets/Images/Know_your_progress.png"
import compare from "../../assets/Images/Compare_with_others.png"
import plan from "../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button";


const LearningSection = () => {
    return (
        <div className="mt-[150px]">
            <div className="flex flex-col gap-5 items-center">
                <div className="text-4xl font-semibold text-center">
                    Your rapid journey to
                    <HighlightText text={" Own a House "} />
                    starts here!
                </div>
                <div className="text-center text-richblack-600 mx-auto text-base mt-2 font-medium w-[65%]">
                    A centralized marketplace to list and sell properties, offering access to a larger audience and direct connections to potential buyers and banks, streamlining the sales process.
                </div>

                <div className="flex flex-row items-center justify-center mt-5">
                    <img 
                    src={know}
                    alt="knowYourProgressImg"
                    className="object-contain -mr-32"
                    />
                    <img 
                    src={compare}
                    alt="compareImg"
                    className="object-contain "
                    />
                    <img 
                    src={plan}
                    alt="planImg"
                    className="object-contain -ml-36"
                    />
                </div>
                <div className="w-fit ">
                    <CTAButton active={true} linkto={"/signup"}>
                        Get Started Now!
                    </CTAButton>
                </div>

            </div>

        </div>
    )
}
export default LearningSection;