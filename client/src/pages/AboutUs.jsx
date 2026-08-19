import React from 'react';
import Navbar from '../components/Navbar';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <>
            <Navbar />

            <main className="about-page">

                {/* Hero Section */}
                <section className="about-hero">
                    <div className="about-hero-content">
                        <span>WHO WE ARE</span>

                        <h1>
                            Style that feels
                            <br />
                            <strong>uniquely yours.</strong>
                        </h1>

                        <p>
                            We bring together modern fashion, quality clothing,
                            and timeless styles to help you look and feel your best.
                        </p>
                    </div>
                </section>


                {/* About Section */}
                <section className="about-content">

                    <div className="about-text">
                        <span className="section-label">
                            ABOUT US
                        </span>

                        <h2>
                            Fashion made simple.
                        </h2>

                        <p>
                            We believe fashion should be accessible, comfortable,
                            and expressive. Our collection is carefully selected
                            to bring you stylish clothing for everyday life.
                        </p>

                        <p>
                            From traditional designs to modern outfits, we aim
                            to offer something for everyone while maintaining
                            quality and affordability.
                        </p>
                    </div>


                    <div className="about-highlight">

                        <div className="highlight-box">
                            <h3>Quality</h3>
                            <p>
                                Carefully selected products made with quality
                                and comfort in mind.
                            </p>
                        </div>

                        <div className="highlight-box">
                            <h3>Style</h3>
                            <p>
                                Modern and timeless designs for every occasion.
                            </p>
                        </div>

                        <div className="highlight-box">
                            <h3>Value</h3>
                            <p>
                                Great fashion at prices that make sense.
                            </p>
                        </div>

                        <div className="highlight-box">
                            <h3>Customer First</h3>
                            <p>
                                Your satisfaction is at the heart of everything
                                we do.
                            </p>
                        </div>

                    </div>

                </section>


                {/* Mission */}
                <section className="mission-section">

                    <span className="section-label">
                        OUR MISSION
                    </span>

                    <h2>
                        Making every outfit count.
                    </h2>

                    <p>
                        Our mission is to make fashion shopping simple,
                        enjoyable, and accessible. We want every customer
                        to find clothing that reflects their personality
                        and makes them feel confident.
                    </p>

                </section>


                {/* CTA */}
                <section className="about-cta">

                    <h2>
                        Find your next favourite outfit.
                    </h2>

                    <p>
                        Explore our collection and discover styles made for you.
                    </p>

                    <button>
                        Explore Collection
                    </button>

                </section>

            </main>
        </>
    );
};

export default AboutUs;