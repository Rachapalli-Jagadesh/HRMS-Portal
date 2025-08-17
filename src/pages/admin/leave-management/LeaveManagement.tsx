import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faScrewdriverWrench, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LeaveMangement() {
  const location: any = useLocation();
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    if (location.pathname.includes('/settings') || location.pathname.includes('/relief-officers') || location.pathname.includes('/recall') || location.pathname.includes('/history')) {
      setIsBannerVisible(false);
    } else {
      setIsBannerVisible(true);
    }

  }, [location]);

  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      {/* Topbar */}
      <div className="flex items-center justify-between p-4 bg-white shadow">
        {/* Sidebar toggle */}
        <FontAwesomeIcon icon={faBars} className="text-xl cursor-pointer" />

        {/* Dropdown and search */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-blue-800 text-white rounded">All Candidates</button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded border"
            />
            <FontAwesomeIcon icon="magnifying-glass" className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <FontAwesomeIcon icon={faBell} className="text-blue-600 text-xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">13</span>
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faScrewdriverWrench} className="text-yellow-500 text-xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">13</span>
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="text-green-600 text-xl" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">13</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        {/* Title Section */}
        <div className="flex items-center gap-2 text-lg font-semibold mb-4">
          <FontAwesomeIcon icon={faBook} className="text-blue-700" />
          <span>Leave Management</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Link to="settings"><button className="bg-blue-700 text-white py-3 px-15 rounded shadow">Leave Settings</button></Link>
          <Link to="recall"><button className="bg-blue-700 text-white py-3 px-15 rounded shadow">Leave Recall</button></Link>
          <Link to="history"><button className="bg-blue-700 text-white py-3 px-15 rounded shadow">Leave History</button></Link>
          <Link to="relief-officers"><button className="bg-blue-700 text-white py-3 px-15 rounded shadow">Relief Officers</button></Link>
        </div>

        {/* Banner Section */}
        {isBannerVisible && <div className="bg-blue-900 text-white p-15 rounded-lg flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-md mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">
                Manage <span className="text-yellow-400">ALL</span> Leave Applications
              </h2>
              <p className="text-sm">A relaxed employee is a performing employee.</p>
            </div>
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3845/3845842.png"
                alt="Relaxed Employee"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        }

        <Outlet/>
      </div>
    </div>
  );
}