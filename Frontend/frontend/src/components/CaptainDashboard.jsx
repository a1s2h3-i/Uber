// CaptainDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CaptainDashboard = () => {
    const { captain } = useContext(CaptainDataContext);
    const [rides, setRides] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/captain/rides`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                setRides(response.data.rides);
                setStats(response.data.stats);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rides:', error);
                setLoading(false);
            }
        };
        
        fetchRides();
    }, []);
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Captain Dashboard</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-gray-500">Total Earnings</h3>
                        <p className="text-2xl font-bold">₹{stats.totalEarnings?.toFixed(2) || 0}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-gray-500">Total Rides</h3>
                        <p className="text-2xl font-bold">{stats.totalRides || 0}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-gray-500">Completed Rides</h3>
                        <p className="text-2xl font-bold">{stats.completedRides || 0}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-gray-500">Cancelled Rides</h3>
                        <p className="text-2xl font-bold">{stats.cancelledRides || 0}</p>
                    </div>
                </div>
                
                {/* Rides Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <h2 className="p-4 text-xl font-semibold">Ride History</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rider</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pickup</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fare</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rides.map((ride) =>{
                                 console.log("Ride user data:", ride.user)
                               
                               return (
                                    
                                    
                                    <tr key={ride._id} className="hover:bg-gray-50">
                                       
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(ride.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        {ride.user?.fullname?.firstname || ride.user?.name || ride.riderName || 'N/A'} 
                                        {ride.user?.fullname?.lastname || ''}
                                            <br />
                                            <span className="text-sm text-gray-500">{ride.user?.phone || ''}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{ride.pickup}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{ride.destination}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">₹{ride.fare?.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${ride.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                                  ride.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                                  'bg-yellow-100 text-yellow-800'}`}>
                                                {ride.status}
                                            </span>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
                            
    );
};

export default CaptainDashboard;