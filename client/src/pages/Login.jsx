import React, { useState, useEffect } from 'react';
import { login, getAuthUser } from '../api/auth';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({theme}) => {

    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {

        if (user) {
            navigate('/');
        }

    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate form data
    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            console.log('User data submitted:', formData);
            try {
                await login(formData);  // Assuming login API call
                const userLoggedIn = await getAuthUser();

                setUser(userLoggedIn);
                setSuccessMessage('Login successful');
            } catch (error) {
                setErrors({ ...errors, general: 'Invalid credentials. Please try again' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen ${theme === "light" ? "bg-gray-100 text-gray-800" : "bg-neutral-800 text-gray-100"}`}>
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Login'}
                    </button>
                </form>
                <p>Didn't Create account? <Link className='text-blue-500' to={"/register"}>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;
