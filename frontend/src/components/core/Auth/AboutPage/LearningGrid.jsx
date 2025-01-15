import React from "react";
import HighlightText from "../../../HomePage/HighlightText";
import CTAButton from "../../../HomePage/Button";

// LEARNING GRID ARRAY banani h saaath m milkar 

const LearningGrid = () => {    
    return (    
        <div className="grid mx-auto grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit ">
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div
                        key={index}
                        className={`${index===0 && "lg:col-span-2 lg:h-[280px] p-5"}
                        ${
                            card.order %2 ===1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
                        }
                        ${card.order===3 && "lg:col-start-2 "}
                        ${card.order===0 && "bg:transparent"}
                        `}>
                            {
                                card.order<0 ? (
                                    <div className="lg:w-[80%] flex flex-col pb-5 gap-3">
                                        <div className="text-4xl font-semibold">
                                            {card.heading}
                                            <HighlightText text={card.highlightText} />
                                        </ div>
                                        <p className="font-medium">
                                            {card.description}
                                        </p>
                                        <div className="w-fit">
                                            <CTAButton active={true} linkto={card.BtnLink}>
                                                {card.BtnText}
                                            </CTAButton>

                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="flex flex-col gap-8 p-7">
                                        <h1 className="text-richblack-5 text-lg">
                                            {card.heading}
                                        </h1>
                                        <p className="text-richblack-300 font-medium">{card.description}</p>
                                    </div>
                                )
                            }

                        </div>
                    )
 
                })
            }
            
        </div>
    )
}
export default LearningGrid;