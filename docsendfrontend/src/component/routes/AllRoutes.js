import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home.js';
import Login from '../pages/SignUp/Login.js';
import Header from '../Global/Header.js';
import Footer from '../Global/Footer.js';
import AddNewCustomer from '../pages/insurance/AddNewCustomer.js';
import Insurance from '../pages/insurance/InsuranceSideBar';
import LayoutComponent from '../pages/insurance/LayoutComponent';
import InsuranceLayout from '../pages/insurance/InsuranceLayout';
import Template from '../pages/insurance/Template';
import SendForm from '../pages/insurance/SendForm';
import Settings from '../pages/insurance/Settings';
import Customers from '../pages/insurance/Customers';
import CreateTemplate from '../pages/insurance/CreateTemplate';
import Team from '../pages/insurance/Team';
import BuyCredit from '../pages/insurance/BuyCredit';
import Agency from '../pages/insurance/Agency';
import Agent from '../pages/insurance/Agent';
import CreateCustomer from '../pages/insurance/CreateCustomer';
import ListCustomer from '../pages/insurance/ListCustomer';
import ListAgents from '../pages/insurance/ListAgents';
import CreateAgentForm from '../pages/insurance/CreateAgentForm';
import DefaultTemplate from '../pages/insurance/DefaultTemplate';
import Profile from '../pages/insurance/Profile';
import AdminDashboard from '../pages/insurance/Admin/AdminDashboard.js';
import AdminDashboardLayout from '../pages/insurance/Admin/AdminDashboardLayout.js';
import DashboardContent from '../pages/insurance/Admin/DashboardContent.js';
import UserManagement from '../pages/insurance/Admin/UserManagement.js';
import AdminDocuments from '../pages/insurance/Admin/AdminDocuments.js';
import AdminAnalytics from '../pages/insurance/Admin/AdminAnalytics.js';
import AdminMessages from '../pages/insurance/Admin/AdminMessage.js'
import  AdminDataManagement from '../pages/insurance/Admin/AdminDataManagement.js';
import AdminSettings from '../pages/insurance/Admin/AdminSettings.js';
import AdminTools from '../pages/insurance/Admin/AdminTools.js'
import AdminSecurity from '../pages/insurance/Admin/AdminSecurity.js';



const AllRoutes = () => {
  return (
    <Router>
      <div className="body-bg flex flex-col min-h-screen ">
        <Header />
        <div className=""></div>
        <main className="flex-grow ">
          
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/default_templates" element={<DefaultTemplate />} />
            <Route path="/admin_dashboard" element={<AdminDashboard />} />

             {/* // Imsurance Component */}
             <Route path="templates" element={<InsuranceLayout> <Template /> </InsuranceLayout> } />
                <Route path="/insurance_layout" element={<InsuranceLayout> <LayoutComponent /> </InsuranceLayout>} />
                <Route path="/send-form" element={<InsuranceLayout> <SendForm /> </InsuranceLayout>} />
                <Route path="/add-new-customer" element={<InsuranceLayout> <AddNewCustomer /> </InsuranceLayout>} />
                <Route path="/settings" element={<InsuranceLayout> <Settings /> </InsuranceLayout>} />
                <Route path="/customers" element={<InsuranceLayout> <Customers /> </InsuranceLayout>} />
                <Route path="/create-template" element={<InsuranceLayout> <CreateTemplate /> </InsuranceLayout>} />
                <Route path="/team" element={<InsuranceLayout> <Team /> </InsuranceLayout>} />
                <Route path="/buy-credits" element={<InsuranceLayout> <BuyCredit /> </InsuranceLayout>} />
                <Route path="/agency" element={<InsuranceLayout> <Agency /> </InsuranceLayout>} />
                <Route path="/agent" element={<InsuranceLayout> <Agent /> </InsuranceLayout>} />
                <Route path="/create-customer" element={<InsuranceLayout> <CreateCustomer /> </InsuranceLayout>} />
                <Route path="/list-customer" element={<InsuranceLayout> <ListCustomer /> </InsuranceLayout>} />
                <Route path="/create-agents" element={<InsuranceLayout> <CreateAgentForm /> </InsuranceLayout>} />
                <Route path="/list-agents" element={<InsuranceLayout> <ListAgents /> </InsuranceLayout>} />
                <Route path="/profile" element={<InsuranceLayout> <Profile /> </InsuranceLayout>} />

              
                <Route path="/dashboard_content" element={<AdminDashboardLayout> <DashboardContent /> </AdminDashboardLayout>} />
                <Route path="/user_management" element={<AdminDashboardLayout> <UserManagement /> </AdminDashboardLayout>} />
                <Route path="/admin/documents" element={<AdminDashboardLayout> <AdminDocuments /> </AdminDashboardLayout>} />
                <Route path="/admin/analytics" element={<AdminDashboardLayout> <AdminAnalytics /> </AdminDashboardLayout>} />
                 <Route path="/admin/messages" element={<AdminDashboardLayout> <AdminMessages /> </AdminDashboardLayout>} />
                <Route path="/admin/settings" element={<AdminDashboardLayout> <AdminSettings /> </AdminDashboardLayout>} /> 
                <Route path="/admin/data" element={<AdminDashboardLayout> < AdminDataManagement /> </AdminDashboardLayout>} />
                 <Route path="/admin/tools" element={<AdminDashboardLayout> <AdminTools /> </AdminDashboardLayout>} /> 
                <Route path="/admin/security" element={<AdminDashboardLayout> <AdminSecurity /> </AdminDashboardLayout>} /> 

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AllRoutes;
