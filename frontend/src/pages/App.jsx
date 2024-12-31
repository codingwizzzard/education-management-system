import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './Index';
import AddCourse from './AddCourse';
import ViewCourses from './ViewCourses';
import UploadAssignment from './UploadAssignment';
import CreateQuiz from './CreateQuiz';
import ViewGrades from './ViewGrades';
import ProtectedRoute from '../midleware/ProtectedRoute';
import Unauthorized from './Unauthorized'; 
import Layout from "./Layout";
import Login from './Login';
import Register from './Register';
import ViewEnrolledCourses from './ViewEnrolledCourses';
import EnrollStudent from './EnrollStudent';
import TeacherDashboard from './TeacherDashboard';
import CreateQuizPage from './CreateQuizPage';
import AvailableQuizzesPage from './AvailableQuizzesPage';
import TakeQuizPage from './TakeQuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/" element={ <ProtectedRoute allowedRoles={['Admin']}><Index /></ProtectedRoute>} />
          <Route path="/add-courses" element={<ProtectedRoute allowedRoles={['Admin']}><AddCourse /></ProtectedRoute>} />
          
          <Route path="/edit-course/:courseId" element={<ProtectedRoute allowedRoles={['Admin', 'Teacher']}><AddCourse /></ProtectedRoute>} />
          <Route path="/view-grades" element={<ProtectedRoute allowedRoles={['Student']}><ViewGrades /></ProtectedRoute>} />

          <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRoles={['Teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/create-quiz" element={<ProtectedRoute allowedRoles={['Teacher']}><CreateQuizPage /></ProtectedRoute>} />

          <Route path="/available-quiz" element={<ProtectedRoute allowedRoles={['Student']}><AvailableQuizzesPage /></ProtectedRoute>} />
          <Route path="/student/quiz/:quizId" element={ <ProtectedRoute allowedRoles={['Student']}><TakeQuizPage /></ProtectedRoute>}/>

          <Route path="/enroll-students" element={<ProtectedRoute allowedRoles={['Admin']}><EnrollStudent/></ProtectedRoute>} />
          <Route path="/my-courses" element={<ProtectedRoute allowedRoles={['Student']}><ViewEnrolledCourses/></ProtectedRoute>} />
          <Route path="/upload-assignment/:courseId" element={<ProtectedRoute allowedRoles={['Student']}><UploadAssignment /></ProtectedRoute>} />
          <Route path="/create-quiz/:courseId" element={<ProtectedRoute allowedRoles={['Student']}><CreateQuiz /></ProtectedRoute>} />

          <Route path="/view-courses" element={<ProtectedRoute allowedRoles={['Admin', 'Teacher', 'Student']}><ViewCourses /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
