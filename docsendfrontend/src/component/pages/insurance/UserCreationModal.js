// UserCreationModal.js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const UserSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
  role: Yup.string().required('Required'),
  // Add other fields as needed
});

const UserCreationModal = ({ onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold mb-4">Create User</h3>
        <Formik
          initialValues={{ email: '', firstName: '', lastName: '', password: '', confirmPassword: '', role: ''}}
          validationSchema={UserSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" type="email" placeholder="Email" className="p-2 border rounded mb-2 w-full" />
              {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}

              <Field name="firstName" placeholder="First Name" className="p-2 border rounded mb-2 w-full" />
              {errors.firstName && touched.firstName ? <div className="text-red-500">{errors.firstName}</div> : null}

              <Field name="lastName" placeholder="Last Name" className="p-2 border rounded mb-2 w-full" />
              {errors.lastName && touched.lastName ? <div className="text-red-500">{errors.lastName}</div> : null}

                <Field name="password" type="password" placeholder="Password" className="p-2 border rounded mb-2 w-full" />
                {errors.password && touched.password ? <div className="text-red-500">{errors.password}</div> : null}

                <Field name="confirmPassword" type="password" placeholder="Confirm Password" className="p-2 border rounded mb-2 w-full" />
                {errors.confirmPassword && touched.confirmPassword ? <div className="text-red-500">{errors.confirmPassword}</div> : null}

                 {/* Role field */}
              <Field as="select" name="role" className="p-2 border rounded mb-2 w-full">
                <option value="">Select Role</option>
                {/* Add options for roles */}
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
                <option value="employee">Eployee</option>
                {/* Add other roles as needed */}
              </Field>
              {errors.role && touched.role ? <div className="text-red-500">{errors.role}</div> : null}

              
              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Create</button>
            </Form>
          )}
        </Formik>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded w-full">Close</button>
      </div>
    </div>
  );
};

export default UserCreationModal;
