import React, { useState } from "react";

const SearchForm = () => {
    const [formData, setFormData] = useState({
        query: "",
        location: "",
        priceRange: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-row gap-4 mt-8 w-[65%]">
            <div className="bg-richblack-800 w-[33%] p-2 rounded-full">
                <input
                    type="text"
                    name="query"
                    placeholder="Search for properties"
                    value={formData.query}
                    onChange={handleChange}
                    className="bg-transparent border-none text-white p-2 focus:outline-none"
                />
            </div>
            <div className="bg-richblack-800 w-[33%] p-2 rounded-full">
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-transparent border-none text-white  p-2 focus:outline-none"
                />
            </div>
            <div className="bg-richblack-800 w-[33%] p-2 rounded-full">
                <input
                    type="text"
                    name="priceRange"
                    placeholder="Price Range"
                    value={formData.priceRange}
                    onChange={handleChange}
                    className="bg-transparent border-none text-white  p-2 focus:outline-none"
                />
            </div>
        </form>
    );
};

export default SearchForm;
