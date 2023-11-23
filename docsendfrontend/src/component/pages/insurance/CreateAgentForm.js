// CreateAgent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import UserCreationModal from './UserCreationModal';

import { ReactComponent as Return } from '../../../assets/images/return.svg';

const AgentSchema = Yup.object().shape({
  npn: Yup.string().required('NPN is required'),
  // Add other validation rules for agent fields
});

const CreateAgentForm = () => {
    const navigate = useNavigate();
    const [showUserModal, setShowUserModal] = useState(true); // Open by default
    const [selectedUser, setSelectedUser] = useState('');

    const createUser = 'user_create';  ////////Dummy field
    const createAgent = 'agent_create'; ////////Dummy field
  
    const handleUserCreate = async (userData) => {
      const response = await createUser(userData);
      console.log(response);
      if (response.success) {
        setSelectedUser(response.data);
        setShowUserModal(false); // Close modal after user creation
      } else {
        toast.error('Error creating user');
      }
    };
  
    const handleSubmit = async (values) => {
      if (!selectedUser) {
        toast.error('Please select a user');
        return;
      }
      // Combine agent data with selected user
      const combinedData = { ...values, user: selectedUser.id };
      const agentResponse = await createAgent(combinedData);
      if (agentResponse.success) {
        toast.success('Agent created successfully');
        // Redirect or perform other actions
      } else {
        toast.error('Error creating agent');
      }
    };

    const handleReturn = async () => {
        navigate(-1);
    }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold mb-4">Create Agent</h1>
        <button 
                onClick = {handleReturn}
                className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
                >
                    < Return className="w-6 h-6 inline-block mr-2" />
                </button>
        </div>
      <Formik
        initialValues={{ npn: '', company_name: '', website: '' }}
        validationSchema={AgentSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* NPN Field */}
            <Field name="npn" placeholder="NPN" className="p-2 border rounded mb-2 w-full" />
            {errors.npn && touched.npn ? <div className="text-red-500">{errors.npn}</div> : null}

            {/* Company Name Field */}
            <Field name="company_name" placeholder="Company Name" className="p-2 border rounded mb-2 w-full" />
            {errors.company_name && touched.company_name ? <div className="text-red-500">{errors.company_name}</div> : null}

            {/* Website Field */}
            <Field name="website" placeholder="Website" className="p-2 border rounded mb-2 w-full" />
            {errors.website && touched.website ? <div className="text-red-500">{errors.website}</div> : null}

            {/* User Select Dropdown */}
            {/* ... existing user dropdown and add user button ... */}

            {/* Submit Button */}
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              Create Agent
            </button>
          </Form>
        )}
      </Formik>

      {/* User Creation Modal */}
      {showUserModal && (
        <UserCreationModal 
          onSubmit={handleUserCreate} 
          onClose={() => setShowUserModal(false)} 
        />
      )}
    </div>
  );
};

export default CreateAgentForm;
