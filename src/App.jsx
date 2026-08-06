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
import AdminDashboard from './components/admin/AdminDashboard'
import AdminLayout from './components/admin/AdminLayout'
import AdminProfile from './components/admin/AdminProfile'
import PorterList from './components/admin/PorterList'
import { ToastContainer } from 'react-toastify'
import PorterEdit from './components/admin/PorterEdit'
import PorterAdd from './components/admin/PorterAdd'
import FarmerList from './components/admin/FarmerList'
import FarmerEdit from './components/admin/FarmerEdit'
import FarmerAdd from './components/admin/FarmerAdd'
import FarmersBal from './components/admin/FarmersBal'
import PayFarmer from './components/admin/PayFarmer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AuthProvider>
        <ToastContainer 
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}/>
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

          {/* admin routes  */}
          <Route path='/admin-dashboard' element={
            <ProtectedRoute allowedRoles={("admin")}>
              <AdminLayout/>
            </ProtectedRoute>
          }>
            <Route path='' element={<AdminDashboard/>}/>
            <Route path='admin/profile' element={<AdminProfile/>}/>
            <Route path='admin/porter' element={<PorterList/>}/>
            <Route path='admin/porter/edit/:id' element={<PorterEdit/>}/>
            <Route path='admin/porter/add' element={<PorterAdd/>}/>
            <Route path='admin/farmer' element={<FarmerList/>}/>
            <Route path='admin/farmer/edit/:id' element={<FarmerEdit/>}/>
            <Route path='admin/farmer/add' element={<FarmerAdd/>}/>
            <Route path='admin/farmer/balance' element={<FarmersBal/>}/>
            <Route path='admin/farmer/payfarmer' element={<PayFarmer/>}/>

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
