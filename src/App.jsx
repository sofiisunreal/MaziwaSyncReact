import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import NotAuthorized from './components/NotAuthorized'
import NotFound from './components/NotFound'
import { AuthProvider } from './components/context/AuthContext'
import Login from './components/Login'
import ProtectedRoute from './components/context/ProtectedRoute'
import PorterDashboard from './components/porter/PorterDashboard'
import PorterLayout from './components/porter/PorterLayout'
import CollectMilk from './components/porter/CollectMilk'
import MyCollections from './components/porter/MyCollections'
import PorterNotice from './components/porter/PorterNotice'
import FarmerDashboard from './components/farmer/FarmerDashboard'
import FarmerLayout from './components/farmer/FarmerLayout'
import FarmerNotice from './components/farmer/FarmerNotice'
import FarmerFeedback from './components/farmer/FarmerFeedback'
import FarmerProfile from './components/farmer/FarmerProfile'
import MilkCollections from './components/farmer/MilkCollections'
import PorterProfile from './components/porter/PorterProfile'
import CattleAI from './components/farmer/CattleAI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* porter role routes */}
          <Route path='/porter-dashboard' element={
            <ProtectedRoute allowedRoles={["porter"]}>
              <PorterLayout />
            </ProtectedRoute>
          }>
            <Route path='' element={<PorterDashboard />} />
            <Route path='porter/collect-milk' element={<CollectMilk />} />
            <Route path='porter/collections' element={<MyCollections />} />
            <Route path='porter/notices' element={<PorterNotice />} />
            <Route path='porter/profile' element={<PorterProfile/>}/>
          </Route>

          {/* farmer routes  */}
          <Route path='/farmer-dashboard' element={
            <ProtectedRoute allowedRoles={("farmer")}>
              <FarmerLayout />
            </ProtectedRoute>
          }>
            <Route path='' element={<FarmerDashboard />} />
            <Route path='farmer/milkcollections' element={<MilkCollections/>}/>
            <Route path='farmer/notices' element={<FarmerNotice/>}/>
            <Route path='farmer/feedback' element={<FarmerFeedback/>}/>
            <Route path='farmer/profile' element={<FarmerProfile/>}/>
            <Route path='farmer/cattle-ai' element={<CattleAI/>}/>
          </Route>


          <Route path='' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/not-authorized' element={<NotAuthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
