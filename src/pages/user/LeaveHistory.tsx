import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function LeaveHistory() {
    const [leaves, setLeaves] = useState([]);

    const fetchLeaves = async () => {
        let empInfo = null;
        const userInfoStr = localStorage.getItem('userInfo');
        if (userInfoStr) {
            empInfo = JSON.parse(userInfoStr);
        }

        const response = await axios.get('http://localhost:4000/leaves?empId=' + empInfo.id);
        setLeaves(response.data);
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <h2 className="text-sm text-gray-500 mb-4">Dashboard &gt; Apply for Leave</h2>

            {/* Leave Application Header */}
            <h1 className="text-xl font-semibold mb-4">Leave Application</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-900 text-white rounded-lg p-4 flex flex-col items-center">
                    <div className="text-3xl font-bold">60</div>
                    <div className="text-sm mt-2">Annual Leave</div>
                    <button className="mt-3 px-4 py-1 bg-yellow-400 text-black rounded-md text-sm font-semibold"><Link to="/user/leave-apply?type=Annual Leave">Apply</Link></button>
                </div>
                <div className="bg-blue-900 text-white rounded-lg p-4 flex flex-col items-center">
                    <div className="text-3xl font-bold">20</div>
                    <div className="text-sm mt-2">Sick Leave</div>
                    <button className="mt-3 px-4 py-1 bg-yellow-400 text-black rounded-md text-sm font-semibold"><Link to="/user/leave-apply?type=Sick Leave">Apply</Link></button>
                </div>
                <div className="bg-blue-900 text-white rounded-lg p-4 flex flex-col items-center">
                    <div className="text-3xl font-bold">60</div>
                    <div className="text-sm mt-2">Maternity Leave</div>
                    <button className="mt-3 px-4 py-1 bg-yellow-400 text-black rounded-md text-sm font-semibold"><Link to="/user/leave-apply?type=Maternity Leave">Apply</Link></button>
                </div>
                <div className="bg-blue-900 text-white rounded-lg p-4 flex flex-col items-center">
                    <div className="text-3xl font-bold">30</div>
                    <div className="text-sm mt-2">Casual Leave</div>
                    <button className="mt-3 px-4 py-1 bg-yellow-400 text-black rounded-md text-sm font-semibold"><Link to="/user/leave-apply?type=Causal Leave">Apply</Link></button>
                </div>
            </div>

            {/* Leave History Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Leave History</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Export
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded shadow-sm bg-white">
                    <thead className="bg-blue-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-5 py-3 text-start">S No</th>
                            <th className="px-5 py-3 text-start">Duration(s)</th>
                            <th className="px-5 py-3 text-start">Start Date</th>
                            <th className="px-5 py-3 text-start">End Date</th>
                            <th className="px-5 py-3 text-start">Type</th>
                            <th className="px-5 py-3 text-start">Reason(s)</th>
                            <th className="px-5 py-3 text-start">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800">
                        {leaves.map((leave: any, index) => (
                            <tr className="bg-blue-50">
                                <td className="px-5 py-3">{index + 1}</td>
                                <td className="px-5 py-3">{leave.duration}</td>
                                <td className="px-5 py-3">{leave.startDate}</td>
                                <td className="px-5 py-3">{leave.endDate}</td>
                                <td className="px-5 py-3">{leave.type}</td>
                                <td className="px-5 py-3">{leave.reasonForLeave}</td>
                                <td className="px-5 py-3"><button className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800">Actions</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default LeaveHistory;