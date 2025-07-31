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
            <Route path="/dashboard" element={<Sidebar />}>
              <Route index element={<Navigate to="add-task" />} /> 
              <Route path="add-task" element={<AddTask />} />
              <Route path="add-task-type" element={<AddTaskType />} />
              <Route path="comments" element={<Comments />} />
              <Route path="all-tasks" element={<ViewTask />} />
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
