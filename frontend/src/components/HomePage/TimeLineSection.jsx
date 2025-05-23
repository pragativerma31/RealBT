import React from "react";

import Logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../assets/Images/TimelineImage.png"

const timeLine=[
    {
        Logo: Logo1,
        Heading:"Leadership",
        Description:"Fully committed to the company",
    },
    {
        Logo: Logo2,
        Heading:"Leadership",
        Description:"Fully committed to the company",
    },
    {
        Logo: Logo3,
        Heading:"Leadership",
        Description:"Fully committed to the company",
    },
    {
        Logo: Logo4,
        Heading:"Leadership",
        Description:"Fully committed to the company",
    },

]
const TimeLineSection = () => {
    return (    
        <div>
            <div className=" flex flex-row gap-10 items-center">
                <div className="w-[45%] flex flex-col gap-5">
                    {
                        timeLine.map((element,index)=>{
                            return(
                                <div className="flex flex-row gap-5" key={index}>
                                    <div className="w-[50px] h-[50px] bg-white flex items-center">
                                        <img src={element.Logo} />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.Heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                    </div>

                                </div>

                            )
                        })
                    }

                </div>
                <div className="relative shadow-blue-200">
                    <img src={TimeLineImage} alt="timeLineImage" className="shadow-white object-cover h-fit" />

                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-10">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-caribbeangreen-300 text-sm">Years of experience</p>
                        </div>
                        <div className="flex gap-5 items-center px-10">
                        <p className="text-3xl font-bold">300+</p>
                        <p className="text-caribbeangreen-300 text-sm">Properties</p>
                        </div>

                    </div>

                </div>


            </div>

        </div>
    )
}
export default TimeLineSection;