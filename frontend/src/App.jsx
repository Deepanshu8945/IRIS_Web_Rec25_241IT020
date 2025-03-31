import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

import {Routes,Route,Navigate} from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EquipmentPage from "./pages/EquipmentPage";
import UsersPage from "./pages/UsersPage";
import InfrastructurePage from "./pages/InfrastructurePage";

const App = ()=> {
  const {authUser,checkAuth,isCheckingAuth,admin} = useAuthStore()

  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  // console.log({checkAuth});

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  
  return (
    <div > 
      {authUser && <NavBar/>}

      <Routes>
        <Route path="/" element={authUser? (admin ? <AdminDashboard/>: <UserDashboard/>) : <Navigate to= "/login"/>} />
        <Route path="/signup" element={!authUser? <SignupPage/>: <Navigate to= "/"/>} />
        <Route path="/login" element={!authUser? <LoginPage/> : <Navigate to= "/"/>} />
        <Route path="/equipment" element={authUser? <EquipmentPage/> : <Navigate to= "/"/>} />
        <Route path="/infrastructure" element={authUser? <InfrastructurePage/> : <Navigate to= "/"/>} />
        <Route path="/users" element={admin? <UsersPage/> : <Navigate to= "/"/>} />
      </Routes>

      <Toaster/>
    </div>
  );
}

export default App;
