import React from "react";

const Stats = [

    { count: "2k", label: "Active Users" },
    { count: "300+", label: "Properties Listed" },
    { count: "25+", label: "Bankers Registered" },
    { count: "100+", label: "Successful Transactions" },

];
const StatsComponent = () => {
    return (
        <section>
            <div>
                <div className="flex gap-x-3">
                    {
                        Stats.map((item, index) => {
                            return (
                                <div key={index}>
                                    <h1>{item.count}</h1>
                                    <h2>{item.label}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    )
}
export default StatsComponent;  