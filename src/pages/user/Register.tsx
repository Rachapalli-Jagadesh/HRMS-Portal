import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect } from "react";

import logo from '../../assets/logo.png';

interface Employee {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
}

function Register() {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<Employee>();

    const registerEmployee = async (formValues: Employee) => {
        try {
            const response = await axios.post('http://localhost:4000/employees', formValues);
            toast.success('Registered successfully');
            navigate('/');
        } catch(error) {
            toast.error('Failed to create an account');
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Section */}
            <div className="w-1/2 bg-blue-900 text-white p-12 flex flex-col justify-center">
                <img src={logo} alt="KRIS Logo" className="h-15 mb-8 w-1/4" />

                <h2 className="text-3xl font-semibold mb-4">HR Management Platform</h2>
                <p className="mb-6 text-white/90">
                    Manage all employees, payrolls, and other human resource operations.
                </p>

                <div className="flex gap-4">
                    <button className="bg-yellow-400 text-black px-6 py-2 font-medium rounded-md hover:bg-yellow-300">
                        Learn More
                    </button>
                    <button className="border border-white px-6 py-2 rounded-md hover:bg-white hover:text-blue-900 transition">
                        Our Features
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Welcome to KRIS</h2>
                <p className="text-gray-500 mb-8">Register your account</p>

                <form className="space-y-4" onSubmit={handleSubmit(registerEmployee)}>
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            {...register('firstname')}
                            type="text"
                            placeholder="First Name"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            {...register('lastname')}
                            type="text"
                            placeholder="Last Name"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            {...register('email')}
                            type="email"
                            placeholder="E-mail Address"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            {...register('phoneNumber')}
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            {...register('password')}
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <input type="checkbox" id="newsletter" />
                        <label htmlFor="newsletter">Yes, I want to receive KRIS newsletters</label>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <input type="checkbox" id="terms" />
                        <label htmlFor="terms">
                            I agree to all the{" "}
                            <a href="#" className="text-blue-700 underline">Terms</a>,{" "}
                            <a href="#" className="text-blue-700 underline">Privacy Policy</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-700 font-semibold hover:underline">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    )

}

export default Register;