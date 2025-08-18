import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {  useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { register, handleSubmit } = useForm();
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/employees');
            setUsers(response.data);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const loginEmployee = (formValues: any) => {
        setErrorMsg('');
        const filteredUser = users.find((user: any) => user.email === formValues.email && user.password === formValues.password);
        if (filteredUser) {
            localStorage.setItem('userInfo', JSON.stringify(filteredUser));
            navigate('/user/leave-history');
        } else {
            setErrorMsg('Incorrect email or password');
        }
    };  

    return (
        <div className="min-h-screen flex">
            {/* Left side - Login form */}
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
                <img src={logo} alt="KRIS Logo" className="h-15 mb-8 w-1/4" />

                <h2 className="text-3xl font-bold text-blue-900 mb-2">Login</h2>
                <p className="text-gray-500 mb-8">Login to your account.</p>
                {errorMsg && <p className='my-2 text-red-500'>{errorMsg}</p>}
                <form className="space-y-4" onSubmit={handleSubmit(loginEmployee)}>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="E-mail Address"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-blue-700 font-medium hover:underline">
                            Reset Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Don't have an account yet?{" "}
                        <Link to="/user/register" className="text-blue-700 font-semibold hover:underline">
                            Join KRIS today.
                        </Link>
                    </p>
                </form>
            </div>

            {/* Right side - Image and text */}
            <div className="w-1/2 relative bg-cover bg-center" style={{ backgroundImage: `url('/bg-login.jpg')` }}>
                <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center p-12">
                    <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-lg text-center">
                        <span className="text-gray-200">Manage all </span>
                        <span className="text-yellow-400">HR Operations</span>
                        <span className="text-gray-200"> from the comfort of your home.</span>
                    </h2>
                </div>

                {/* Dot indicators (optional) */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-4 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-2 bg-white rounded-full opacity-60"></div>
                    <div className="w-4 h-2 bg-white rounded-full opacity-60"></div>
                </div>
            </div>
        </div>
    )

}

export default Login;