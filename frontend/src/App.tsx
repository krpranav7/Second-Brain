import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './pages/Profile'
import { SharedBrain } from './pages/SharedBrain';

function App() {

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path="/brain/:shareLink" element={<SharedBrain />} />
    </Routes>
  )
}

export default App
