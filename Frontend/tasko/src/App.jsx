import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddTask from './components/AddTask';
import AddTaskType from './components/AddTaskType';
import ViewTask from './components/ViewTask';
import Comments from './components/Comments';
import Home from './components/Home';
// import AuthPage from './components/AuthPage';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoutes from './context/ProtectedRoutes';

function App() {
  const { user } = useAuth(); 

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      
    
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {user && (
            <Route path="/dashboard" element={<ProtectedRoutes><Sidebar /></ProtectedRoutes>}>
              <Route index element={<Navigate to="add-task" />} /> 
              <Route path="add-task" element={<ProtectedRoutes><AddTask /></ProtectedRoutes>} />
              <Route path="add-task-type" element={<ProtectedRoutes><AddTaskType /></ProtectedRoutes>} />
              <Route path="comments" element={<ProtectedRoutes><Comments /></ProtectedRoutes>} />
              <Route path="all-tasks" element={<ProtectedRoutes><ViewTask /></ProtectedRoutes>} />
            </Route>
          )}

          {!user && (
            <Route path="/dashboard/*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
