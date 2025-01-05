import React from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import { useState } from "react";
import HighlightText from "./HighlightText";


const tabsName=[
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Carreer paths", 
];
const ExploreMore = () => { 
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div>
            <div className="text-4xl font-semibold text-center mt-10">
                Unlock the power of 
                <HighlightText text={" RealBT "} />
            </div>
            <p className="text-center text-richblack-400 text-sm text-[16px] mt-3">
                Get any property you can imagine 
            </p>
            <div className="mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1">
                {
                    tabsName.map( (element,index)=>{
                        return(
                            <div className={`text-[16px] flex flex-row items-center gap-2
                                ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} onClick={()=> setMyCards(element)}>{element}</div>
                        )
                    })
                }
            </div>

            <div className="lg:h-[150px]"></div>
            

        </div>

    )
    
}
export default ExploreMore;