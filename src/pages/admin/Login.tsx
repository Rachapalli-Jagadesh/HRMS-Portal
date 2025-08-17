import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function ALogin() {
    const [admins, setAdmins] = useState([]);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admins');
            setAdmins(response.data);
        } catch(error) {

        }
    };

    const validateCredentials = (formValues: any) => {
        const filteredAdmin = admins.find((admin: any) => 
            admin.email === formValues.email && admin.password === formValues.password);
        if (filteredAdmin) {
            toast.success('Loggedin successfully');
            navigate('/admin/leave-management');
        } else {
            toast.error('Incorrect email or password');
        }
    };

    return (
        <div
            className="h-screen w-screen bg-cover bg-center relative"
        >
            <div className="absolute inset-0 bg-blue-900 bg-opacity-70 flex items-center justify-center">
                <div className="bg-transparent text-white p-8 rounded-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
                    <p className="text-center text-sm mb-6">Login to your account.</p>

                    <form className="space-y-4" onSubmit={handleSubmit(validateCredentials)}>
                        <div>
                            <label className="block text-sm mb-1">E-mail Address</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-4 py-2 text-black bg-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Password</label>
                            <input
                                type="password" {...register('password')}
                                className="w-full px-4 py-2 text-black bg-white rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="form-checkbox text-blue-500 mr-2" />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-300 hover:underline">
                                Reset Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-300 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ALogin;