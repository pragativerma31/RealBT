import React from "react";
import HighlightText from "../components/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/Auth/AboutPage/Quote";
import StatsComponent from "../components/core/Auth/AboutPage/Stats";
import LearningGrid from "../components/core/Auth/AboutPage/LearningGrid";
import FoundingStory from "../assets/Images/FoundingStory.png";
import ContactFormSection from "../components/core/Auth/AboutPage/ContactFormSection";
import Footer from "../components/common/Footer"



const AboutUs = () => {
    return (
        <div className="mx-auto mt-[100px] text-white w-11/12 max-w-maxContent">
            {/* SECTION 1 */}
            <section>
                <div className="mt-[100px] text-white">
                    <header>
                        Driving Innovation in Real Estate for a
                        <HighlightText text={" Better Future "}></HighlightText>
                        <p>A unified platform that simplifies property search and loan matching, offering AI-powered loan comparisons tailored to customers' financial profiles for streamlined decision-making and better property-loan alignment.
                        </p>
                    </header>
                    <div className="flex gap-x-3">
                        <img src={BannerImage1} />
                        <img src={BannerImage2} />
                        <img src={BannerImage3} />
                    </div>

                </div>
            </section>

            {/* SECTION 2 */}
            <section>
                <div>
                    <Quote></Quote>
                </div>
            </section>

            {/* SECTION 3 */}
            <section>
                <div className="flex flex-col">
                    {/* Founding stroy div */}
                    <div className="flex">
                        {/* Founding story left box */}
                        <div>
                            <h1>Our Founding Story</h1>
                            <p>Every great journey begins with a vision. For us, it started with a simple question: Why does buying property and securing loans have to be so complicated?

                                We recognized a persistent challenge in the real estate market. Brokers and bankers, two essential pillars of property transactions, often worked in silos, leaving customers to navigate the chaos of coordinating property deals and securing loans. The process was daunting, time-consuming, and fraught with uncertainty.

                            </p>
                            <p>Our founders, a group of experienced brokers, financial experts, and tech enthusiasts, came together with a shared goal: to bridge the gap between these two worlds. We envisioned a seamless ecosystem where brokers could list properties, bankers could offer tailored loan options, and customers could find everything they needed in one place.</p>
                        </div>

                        <div>
                            {/* Founding story left box */}
                            <img src={FoundingStory}></img>
                        </div>
                    </div>

                    {/* Vision & mission div */}
                    <div className="flex">
                        {/* left box */}
                        <div>
                            <h1>Our Vision</h1>
                            <p>Our vision is to create a world where buying a property is no longer a complicated or stressful process. We aim to seamlessly connect brokers, bankers, and buyers on a single platform, empowering everyone involved with transparency, efficiency, and trust. By leveraging technology and fostering collaboration, we envision a future where owning your dream property is simple, accessible, and hassle-free.</p>
                        </div>

                        {/* right box */}
                        <div>
                            <h1>Our Mission</h1>
                            <p>Our mission is to simplify real estate transactions by uniting brokers, bankers, and buyers on one intuitive platform. We strive to provide a seamless experience where brokers can showcase properties, bankers can offer tailored financial solutions, and buyers can find and finance their dream homes with ease. Through innovation, transparency, and collaboration, we are transforming the way people buy and finance real estate.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 */}
            <StatsComponent />

            {/* SECTION 5 */}
            <section className="flex flex-col mx-auto items-center justify-between gap-5 mb-[140px]"> 
                <LearningGrid />
                <ContactFormSection />
            </section>

            <section>
                <div>
                    Reviews from customers
                    {/* <Reviewslider /> */}
                </div>
            </section>

            <Footer />

        </div>
    )
}
export default AboutUs;