import React, { useContext, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link, useNavigate } from 'react-router-dom'
import context from '../context/AppContext'

const LandingPage = () => {
    const navigate = useNavigate()
    const auth = useContext(context)
    useEffect(() => {
        AOS.init({ duration: 1000, once: true })
        if (auth.isAuthanticated) {
            navigate('/dashboard')
        }
    }, [])

    const reviews = [
        {
            name: "Riya Sharma",
            role: "Principal, Vision Academy",
            feedback: "Digital Academy has completely streamlined our daily operations. We love the automated fee tracking and student performance reports.",
            photo: "https://i.pravatar.cc/150?img=47"
        },
        {
            name: "Amit Verma",
            role: "Director, LearnHub",
            feedback: "Amazing tool! Our teachers and students find it very easy to use. It saved us hours every week.",
            photo: "https://i.pravatar.cc/150?img=12"
        },
        {
            name: "Neha Patel",
            role: "Admin, EduSphere",
            feedback: "Finally, a platform that understands the real needs of an educational institute. Highly recommend it!",
            photo: "https://i.pravatar.cc/150?img=33"
        }
    ]

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false
    }
    
    return (
        <div className="font-sans text-gray-800 bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl font-bold"> <span className=' text-blue-700'>Digital</span> <span className=' text-blue-500'>Academy</span></h1>
                    <div className="space-x-0 md:space-x-6 flex flex-col md:flex-row items-center gap-3 md:gap-0">
                        <Link to={'/register'}
                            className="hidden md:block border border-cyan-500 text-cyan-500 px-5 py-1.5 rounded transition-all duration-300 hover:bg-cyan-500 hover:text-white"
                        >
                            Register
                        </Link>
                        <Link to={'/login'}
                            className=" bg-gradient-to-l from-cyan-400 to-blue-400 text-white px-6.5 py-2 rounded w-full md:w-auto text-center"
                        >
                            Login
                        </Link>
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-20">
                <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-8 gap-12 md:gap-20">

                    {/* Text Section */}
                    <div className="w-full md:w-1/2" data-aos="fade-right">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight">
                            Smarter <span className="text-blue-500">Institute</span> Management Starts Here
                        </h2>
                        <p className="mt-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
                            <span className="font-semibold text-blue-600">Digital Academy</span> is your all-in-one solution for managing student data,
                            courses, attendance, fees, and performance — beautifully and efficiently.
                            <br />
                            {/* Designed for schools, coaching centers, and training institutes, Digital Academy saves your time, reduces paperwork, and ensures
                            a smooth, connected experience for educators and students alike. */}
                        </p>
                        <Link to={'/register'}
                            className="mt-8 inline-flex items-center gap-2 bg-gradient-to-l from-cyan-400 to-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 shadow-md"
                        >
                            🚀 Get Started Today
                        </Link>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-left">
                        <img
                            src="institute.jpg"
                            alt="Institute management"
                            className="w-full max-w-md md:max-w-full h-auto rounded-xl shadow-xl border-4 border-white"
                        />
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">Key Features</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Student Records",
                                desc: "Maintain student profiles, attendance, and academic progress easily.",
                            },
                            {
                                title: "Course Management",
                                desc: "Create, edit, and assign courses with real-time tracking.",
                            },
                            {
                                title: "Payments & Fees",
                                desc: "Track all transactions, generate invoices, and send reminders.",
                            },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
                                data-aos="zoom-in"
                                data-aos-delay={idx * 150}
                            >
                                <h4 className="text-xl font-semibold text-blue-600">{item.title}</h4>
                                <p className="mt-2 text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center" data-aos="fade-up">
                    <h3 className="text-3xl font-bold text-gray-800">Why Digital Academy?</h3>
                    <p className="mt-4 text-gray-600 text-lg">
                        We built EduManage to solve real problems faced by institutions — from scattered data to manual operations.
                        With our solution, admins save time, educators stay informed, and students benefit from structured, timely support.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg w-64" data-aos="fade-up">
                            <h4 className="font-semibold text-blue-600">Secure & Reliable</h4>
                            <p className="text-sm text-gray-600 mt-2">Your data is protected with industry standards.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg w-64" data-aos="fade-up" data-aos-delay="200">
                            <h4 className="font-semibold text-blue-600">Customizable</h4>
                            <p className="text-sm text-gray-600 mt-2">Flexible modules fit your institution's needs.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg w-64" data-aos="fade-up" data-aos-delay="400">
                            <h4 className="font-semibold text-blue-600">24/7 Support</h4>
                            <p className="text-sm text-gray-600 mt-2">Always here to help when you need us most.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-10" data-aos="fade-up">What Our Clients Say</h3>

                    <div className="hidden md:grid md:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay={index * 150}>
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={review.photo} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                                    <div>
                                        <h4 className="font-semibold text-blue-700">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 italic">"{review.feedback}"</p>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden block">
                        <Slider {...sliderSettings}>
                            {reviews.map((review, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md mx-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img src={review.photo} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
                                        <div>
                                            <h4 className="font-semibold text-blue-700">{review.name}</h4>
                                            <p className="text-sm text-gray-500">{review.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic">"{review.feedback}"</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-1 md:px-0 bg-gradient-to-br from-cyan-300 to-cyan-500  text-white text-center" data-aos="zoom-in">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">Start managing smarter today</h3>
                <p className="mt-2 text-lg">Join 1,000+ institutes already using EduManage</p>
                <Link to={'/register'}
                    className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-100 transition"
                >
                    Create Free Account
                </Link>
            </section>

            {/* Footer */}
            <footer className=" py-8 text-center">
                <p>&copy; 2025 Digital Academy. All rights reserved.</p>
                <p className="mt-1">Credentials for Demo | Email: kishalaydas971@gmail.com | password : 1234</p>
                <p className="text-sm mt-1">Contact us: kishalaydas09@gmail.com</p>
            </footer>
        </div>
    )
}

export default LandingPage
