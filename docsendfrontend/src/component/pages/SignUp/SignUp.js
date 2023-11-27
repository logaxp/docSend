import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import IsLoading from '../Loading/Hooks/IsLoading.js';

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    client: Yup.string().required('Client name is required'),
    role: Yup.string().required('Role is required')
  });
  
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Signup successful!');
      navigate('/login');
    }, 2000);

    // Integrate with actual API here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>
      <Formik
       initialValues={{ 
        email: '', 
        first_name: '', 
        last_name: '', 
        password: '', 
        client: '', 
        role: '' 
      }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
           
          <Form className="bg-white shadow-md  max-w-3xl mx-auto px-10 pt-10 pb-10 mb-40 rounded-xl">
            <div className="mb-4 flex-1" >
              <Field name="email" type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="flex gap-4 mb-4">
            
            <div className="mb-4 flex-1">
              <Field name="first_name" type="text" placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              <ErrorMessage name="first_name" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-4 flex-1">
              <Field name="last_name" type="text" placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
              <ErrorMessage name="last_name" component="div" className="text-red-500 text-xs italic" />
            </div>
            </div>
            <div className="flex gap-4 mb-4">
           
            <div className="mb-6 flex-1">
              <Field name="password" type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6 flex-1">
              <Field name="confirm_password" type="password" placeholder="Confirm Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            </div>
            <div className="flex gap-4 mb-4">
            <div className="mb-4 flex-1">
  <Field name="client" type="text" placeholder="Client Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
  <ErrorMessage name="client" component="div" className="text-red-500 text-xs italic" />
</div>

<div className="mb-4 flex-1">
  <Field as="select" name="role" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700">
    <option value="">Select Role</option>
    <option value="Document Sender">Document Sender</option>
    <option value="Document Receiver">Document Receiver</option>
    <option value="Document Manager">Document Manager</option>
    <option value="Admin">Admin</option>
    {/* Add other roles as needed */}
  </Field>
  <ErrorMessage name="role" component="div" className="text-red-500 text-xs italic" />
</div>
</div>

            <div className="flex items-center justify-between">
              <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign Up
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {loading && <IsLoading />}
      <ToastContainer />
    </div>
  );
};

export default Signup;
