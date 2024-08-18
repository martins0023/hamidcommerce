import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Welcome, GetStarted, GetStarted2, GetStarted3, Login, RegisteredUser, ForgetPassword, GetCode, Signup } from "./components";
import { NetworkProvider } from "./components/services/NetworkContext";
import { Dashboard } from "./components/dashboard";
import Women from "./components/screens/women/Women";
import  Men  from "./components/screens/men/Men";
import Notifications from "./components/screens/Notifications";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-colorbg">
        <div className="">
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/GetStarted" element={<GetStarted />} />
            <Route path="/GetStarted2" element={<GetStarted2 />} />
            <Route path="/GetStarted3" element={<GetStarted3 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/RegisteredUser" element={<RegisteredUser />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/GetCode" element={<GetCode />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Women" element={<Women />} />
            <Route path="/Men" element={<Men />} />
            <Route path="/Notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
