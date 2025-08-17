import { useSearchParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const LeaveApplicationForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const leaveType: any = searchParams.get('type');
  const startDateRef: any = useRef('');
  const endDateRef: any = useRef('');
  const durationRef: any = useRef('');
  const resumptionDateRef: any = useRef('');
  const reasonForLeaveRef: any = useRef('');
  const reliefOfficerRef: any = useRef('');
  const [reliefOfficers, setReliefOfficers] = useState([]);
  const navigate = useNavigate();

  const fetchReliefOfficers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/relief-officers');
      setReliefOfficers(response.data);
    } catch(error) {

    }
  };

  useEffect(() => {
    fetchReliefOfficers();
  }, []);

  const applyLeave = async (event: any) => {
    event.preventDefault();
    
    let empInfo = null;
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      empInfo = JSON.parse(userInfoStr);
    }
    const requestPayload = {
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      duration: durationRef.current.value,
      resumptionDate: resumptionDateRef.current.value,
      reasonForLeave: reasonForLeaveRef.current.value,
      reliefOfficerId: reliefOfficerRef.current.value,
      empId: empInfo ? empInfo.id : undefined,
      type: leaveType
    };

    try {

      const response = await axios.post('http://localhost:4000/leaves', requestPayload);
      toast.success('Applied leave successfully');
      navigate('/user/leave-history');
    } catch(error) {

    }

  };

  const calculateWorkingDays = () => {
    if (startDateRef.current.value && endDateRef.current.value) {
      let start = new Date(startDateRef.current.value);
      let end = new Date(endDateRef.current.value);

      let count = 0;
      while (start <= end) {
        const day = start.getDay();
        if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
          count++;
        }
        start.setDate(start.getDate() + 1);
      }

      durationRef.current.value = count;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6" style={{ backgroundColor: '#eff6ff'}}>
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-5" onSubmit={applyLeave}>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-500 flex justify-center items-center gap-2">
            📖 Leave Application
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Fill the required fields below to apply for annual leave.
          </p>
        </div>

        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Leave Type
          </label>
          <input
            value={leaveType}
            type="text" readOnly
            className="w-full mt-1 rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
          />
        </div>

        {/* Start Date, End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date" ref={startDateRef}
              onChange={calculateWorkingDays}
              className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              onChange={calculateWorkingDays}
              type="date" ref={endDateRef}
              className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Duration, Resumption Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="number" ref={durationRef} readOnly
              className="w-full mt-1 rounded-md border border-gray-300 bg-gray-100 p-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resumption Date
            </label>
            <input
              type="date" ref={resumptionDateRef}
              className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Reason for leave */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for leave
          </label>
          <textarea
            rows={3} ref={reasonForLeaveRef}
            className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attach handover document (pdf, jpg, docx or any other format)
          </label>
          <input
            type="file"
            className="mt-2 block w-full text-sm text-gray-900 file:bg-black file:text-white file:rounded file:px-4 file:py-2"
          />
        </div>

        {/* Relief Officer */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose Relief Officer
          </label>
          <select ref={reliefOfficerRef} className="w-full mt-1 rounded-md border border-gray-300 p-2 focus:outline-none bg-gray-100">
            <option>Select your relief officer</option>
            {reliefOfficers.map((reliefOfficer: any) => (
              <option value={reliefOfficer.id}>{reliefOfficer.name}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="reset"
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplicationForm;