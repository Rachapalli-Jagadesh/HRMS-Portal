import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import ALogin from './pages/admin/Login';
import NotFound from './pages/NotFound';
import LeaveHistory from './pages/user/LeaveHistory';
import LeaveApplicationForm from './pages/user/LeaveApplication';
import LeaveMangement from './pages/admin/leave-management/LeaveManagement';
import LeaveSettings from './pages/admin/leave-management/LeaveSettings';
import ReliefOfficers from './pages/admin/leave-management/ReliefOfficers';
import LeaveRecall from './pages/admin/leave-management/LeaveRecall';
import ALeaveHistory from './pages/admin/leave-management/LeaveHistory';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/user/register" element={<Register/>}></Route>
        <Route path='/user/leave-history' element={<LeaveHistory/>}></Route>
        <Route path='/user/leave-apply' element={<LeaveApplicationForm/>}></Route>

        <Route path="/admin/login" element={<ALogin/>}></Route>
        <Route path="/admin/leave-management" element={<LeaveMangement/>}>
          <Route path="history" element={<ALeaveHistory/>}></Route>
          <Route path="settings" element={<LeaveSettings/>}></Route>
          <Route path="relief-officers" element={<ReliefOfficers/>}></Route>
          <Route path="recall" element={<LeaveRecall/>}></Route>
        </Route>
        
        {/* Wild Card Route */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
