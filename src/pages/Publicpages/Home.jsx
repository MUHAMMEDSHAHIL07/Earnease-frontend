import React from "react";
import publicperson from "../../assets/publicperson.png";
import Navbar from "../Publicpages/Navbar"
import Footer from "../Publicpages/Footer";
import man from "../../assets/man.png"
import search from "../../assets/search.png"
import apply from "../../assets/apply.png"
import student1 from "../../assets/student1.png"
const HomePage = () => {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Part-Time Job
            </h1>
            <p className="mb-6 max-w-lg">
              Connect with employers who value student talent and help you build your career while studying.
            </p>
            <div className="space-x-4">
              <button className="bg-white text-blue-600 px-4 py-2 rounded font-medium">Explore Jobs</button>
              <button className="border border-white text-white px-4 py-2 rounded font-medium">Post a Job</button>
            </div>
          </div>
          <img src={publicperson} alt="Team work" className="w-full max-w-md mt-10 md:mt-0" />
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Featured Opportunities</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Marketing Assistant</h3>
                  <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded">Remote</span>
                </div>
                <p className="text-sm mb-2">Tech Solutions Inc.</p>
                <p className="text-sm text-gray-500 mb-4">San Francisco, CA</p>
                <p className="font-bold text-indigo-600 mb-4">₹15–18/hr</p>
                <button className="bg-blue-600 text-white w-full px-4 py-2 rounded font-medium">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
<section className="py-16 px-4 text-center">
  <h2 className="text-2xl font-semibold mb-6">Simple Steps to Success</h2>
  <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
    <div>
      <div className="flex justify-center mb-2">
        <img src={man} alt="" className="w-12 h-12" />
      </div>
      <h3 className="font-semibold">Create Profile</h3>
      <p>Set up your profile and highlight your skills.</p>
    </div>
    <div>
      <div className="flex justify-center mb-2">
        <img src={search} alt="" className="w-12 h-12" />
      </div>
      <h3 className="font-semibold">Find Opportunities</h3>
      <p>Browse jobs and filter opportunities based on your interests.</p>
    </div>
    <div>
      <div className="flex justify-center mb-2">
        <img src={apply} alt="" className="w-12 h-12" />
      </div>
      <h3 className="font-semibold">Apply & Connect</h3>
      <p>Apply for jobs and connect with employers instantly.</p>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-10 text-center">Student Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow flex flex-col items-start">
              <img src="/assets/emma.png" alt="Emma" className="w-12 h-12 rounded-full mb-4" />
              <p className="mb-4 italic">
               Earnease helped me balance my classes with flexible tutoring work that paid well.
              </p>
              <p className="font-bold">Emma, Student</p>
            </div>
            <div className="bg-white p-6 rounded shadow flex flex-col items-start">
              <img src="/assets/raj.png" alt="Raj" className="w-12 h-12 rounded-full mb-4" />
              <p className="mb-4 italic">
              Through Earnease, I landed a weekend delivery job that was perfect for earning pocket money
              </p>
              <p className="font-bold">Raj, Student</p>
            </div>
            <div className="bg-white p-6 rounded shadow flex flex-col items-start">
              <img src="/assets/tanisha.png" alt="Tanisha" className="w-12 h-12 rounded-full mb-4" />
              <p className="mb-4 italic">
                The part-time design internship I found boosted my resume and skills thanks to Earnease.
              </p>
              <p className="font-bold">Tanisha, Student</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
