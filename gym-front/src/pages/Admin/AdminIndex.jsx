import React from 'react';
import AdminNavBar from '../../components/NavBarAdmin';

const AdminIndex = () => {
  return (
    <>
    <AdminNavBar/>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Welcome, Admin</h1>
        <p className="text-gray-600 text-center mb-6">
          You have full access to the dashboard. Manage users, view reports, and monitor the system.
        </p>
        <div className="space-y-4">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none">
            Manage Users
          </button>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none">
            View Reports
          </button>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none">
            System Monitoring
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminIndex;
