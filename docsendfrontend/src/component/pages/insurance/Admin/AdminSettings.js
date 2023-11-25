import React, { useState } from 'react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsAlerts: false,
        systemMaintenanceMode: false,
        userRegistration: true,
        dataBackupFrequency: 'Weekly',
        // Additional settings
    });

    const handleToggle = (settingName) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [settingName]: !prevSettings[settingName]
        }));
    };

    const handleSelectChange = (settingName, value) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [settingName]: value
        }));
    };

    return (
        <div className="container mx-auto p-4 mb-40">
            <h1 className="text-3xl font-semibold mb-6">Admin Settings</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="setting-item flex items-center justify-between mb-4">
                    <label className="font-semibold">Email Notifications:</label>
                    <button onClick={() => handleToggle('emailNotifications')}
                        className={`${settings.emailNotifications ? 'bg-green-500' : 'bg-red-500'} text-white font-bold py-2 px-4 rounded`}>
                        {settings.emailNotifications ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
                <div className="setting-item flex items-center justify-between mb-4">
                    <label className="font-semibold">SMS Alerts:</label>
                    <button onClick={() => handleToggle('smsAlerts')}
                        className={`${settings.smsAlerts ? 'bg-green-500' : 'bg-red-500'} text-white font-bold py-2 px-4 rounded`}>
                        {settings.smsAlerts ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
                <div className="setting-item flex items-center justify-between mb-4">
                    <label className="font-semibold">System Maintenance Mode:</label>
                    <button onClick={() => handleToggle('systemMaintenanceMode')}
                        className={`${settings.systemMaintenanceMode ? 'bg-red-500' : 'bg-green-500'} text-white font-bold py-2 px-4 rounded`}>
                        {settings.systemMaintenanceMode ? 'On' : 'Off'}
                    </button>
                </div>
                <div className="setting-item flex items-center justify-between mb-4">
                    <label className="font-semibold">User Registration:</label>
                    <button onClick={() => handleToggle('userRegistration')}
                        className={`${settings.userRegistration ? 'bg-green-500' : 'bg-red-500'} text-white font-bold py-2 px-4 rounded`}>
                        {settings.userRegistration ? 'Open' : 'Closed'}
                    </button>
                </div>
                <div className="setting-item flex items-center justify-between mb-4">
                    <label className="font-semibold">Data Backup Frequency:</label>
                    <select
                        value={settings.dataBackupFrequency}
                        onChange={(e) => handleSelectChange('dataBackupFrequency', e.target.value)}
                        className="border-2 p-2 rounded-lg"
                    >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                {/* Additional advanced settings */}
            </div>
        </div>
    );
};

export default AdminSettings;
