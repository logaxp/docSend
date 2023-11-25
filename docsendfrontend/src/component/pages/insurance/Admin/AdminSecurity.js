import React, { useState } from 'react';

const AdminSecurity = () => {
    const [securityData, setSecurityData] = useState({
        incidents: 5,
        firewallStatus: 'Active',
        vulnerabilities: ['Vuln1', 'Vuln2', 'Vuln3'],
        accessLogs: ['Log1', 'Log2', 'Log3'],
    });

    // Simulate actions for each security aspect
    const handleIncidentReview = () => console.log('Reviewing incidents...');
    const toggleFirewall = () => setSecurityData({ ...securityData, firewallStatus: securityData.firewallStatus === 'Active' ? 'Inactive' : 'Active' });
    const handleVulnerabilityScan = () => console.log('Scanning for vulnerabilities...');
    const viewAccessLogs = () => console.log('Viewing access logs...');

    return (
        <div className="container mx-auto p-4 mb-40">
            <h1 className="text-3xl font-semibold mb-6">Security Dashboard</h1>
            <div className="grid md:grid-cols-4 gap-4">
                {/* Security Incidents */}
                <div className="security-card bg-white shadow rounded-lg p-4">
                    <h2 className="font-bold text-lg">Security Incidents</h2>
                    <p>{securityData.incidents} incidents detected</p>
                    <button onClick={handleIncidentReview} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Review Incidents
                    </button>
                </div>

                {/* Firewall Status */}
                <div className="security-card bg-white shadow rounded-lg p-4">
                    <h2 className="font-bold text-lg">Firewall Status</h2>
                    <p>Status: {securityData.firewallStatus}</p>
                    <button onClick={toggleFirewall} className={`bg-${securityData.firewallStatus === 'Active' ? 'green' : 'gray'}-500 hover:bg-${securityData.firewallStatus === 'Active' ? 'green' : 'gray'}-700 text-white font-bold py-2 px-4 rounded mt-2`}>
                        {securityData.firewallStatus === 'Active' ? 'Deactivate' : 'Activate'} Firewall
                    </button>
                </div>

                {/* Vulnerabilities */}
                <div className="security-card bg-white shadow rounded-lg p-4">
                    <h2 className="font-bold text-lg">Vulnerabilities</h2>
                    <p>{securityData.vulnerabilities.length} vulnerabilities found</p>
                    <button onClick={handleVulnerabilityScan} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Scan for Vulnerabilities
                    </button>
                </div>

                {/* Access Logs */}
                <div className="security-card bg-white shadow rounded-lg p-4">
                    <h2 className="font-bold text-lg">Access Logs</h2>
                    <button onClick={viewAccessLogs} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        View Logs
                    </button>
                </div>
                {/* Threat Intelligence Integration */}
<div className="security-card bg-white shadow rounded-lg p-4">
    <h2 className="font-bold text-lg">Threat Intelligence</h2>
    <p>Integrate threat intelligence feeds</p>
    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-2">
        Integrate Intelligence
    </button>
</div>

{/* User Activity Monitoring */}
<div className="security-card bg-white shadow rounded-lg p-4">
    <h2 className="font-bold text-lg">User Activity Monitoring</h2>
    <p>Monitor user activities and actions</p>
    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2">
        Monitor Activities
    </button>
</div>


                {/* Security Policy Management */}
<div className="security-card bg-white shadow rounded-lg p-4">
    <h2 className="font-bold text-lg">Security Policy Management</h2>
    <p>Set and update security policies</p>
    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2">
        Update Policies
    </button>
</div>

               {/* Data Backup and Recovery */}
<div className="security-card bg-white shadow rounded-lg p-4">
    <h2 className="font-bold text-lg">Data Backup & Recovery</h2>
    <p>Ensure data is backed up and recoverable</p>
    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-2">
        Manage Backups
    </button>
</div>

            </div>
        </div>
    );
};

export default AdminSecurity;
