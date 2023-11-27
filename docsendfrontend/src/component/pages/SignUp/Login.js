import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import IsLoading from '../../pages/Loading/Hooks/IsLoading';
import { Link } from 'react-router-dom';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      // Simulate login process
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Check if the user is an admin
      if (values.email === 'admin@gmail.com' && values.password === 'Admin@123') {
        toast.success('Admin Login successful!');
        navigate('/admin_dashboard');
      } else {
        toast.success('Login successful!');
        navigate('/insurance');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
  
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center min-h-screen ">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl mb-8 font-bold text-gray-800">Login</h1>
              
              <div className="mb-8">
                <Field name="email" type="email" placeholder="Email Address" className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <div className="mb-6 relative">
                <Field name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full p-3 border rounded focus:outline-none focus:border-blue-500" />
                <FontAwesomeIcon 
                  icon={showPassword ? faEyeSlash : faEye} 
                  onClick={togglePasswordVisibility} 
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300"
                disabled={isSubmitting || loading || !values.email || !values.password}
              >
                {isSubmitting || loading ? 'Logging In...' : 'Log In'}
              </button>

              <div className="text-center mt-4">
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Don't have an account? Sign up
                </Link>
              </div>
              
            </div>
            {loading && <IsLoading />}
          </Form>
        )}
      </Formik>
     
    </>
  );
};

export default Login;
