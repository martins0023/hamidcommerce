import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Welcome,
  GetStarted,
  GetStarted2,
  GetStarted3,
  Login,
  RegisteredUser,
  ForgetPassword,
  GetCode,
  Signup,
} from './components';
import { Dashboard, Explore } from './components/dashboard';
import Women from './components/screens/women/Women';
import Men from './components/screens/men/Men';
import Notifications from './components/screens/Notifications';
import DetailsScreen from './components/screens/DetailsScreen';
import Cart from './components/screens/Cart';
import { CartProvider } from './utils/cartcontext';
import Profile from './components/screens/profile/Profile';
import ChangeEmail from './components/screens/profile/ChangeEmail';
import ChangePassword from './components/screens/profile/ChangePassword';
import Adress from './components/screens/profile/Adress';
import Settings from './components/screens/profile/Settings';
import AccountSettings from './components/screens/profile/AccountSettings';
import SearchResults from './components/screens/SearchResults';
import ExplorePage from './components/screens/ExplorePage';
import Checkoutcart from './components/screens/Checkoutcart';
import PrivateRoute from './utils/PrivateRoute';
import OrderProcessing from './components/screens/payment/OrderProcessing';

const initialOptions = {
  "client-id": "Aeet3ZkhnzmW-k_gI9iHXvdNaiRjlcYuI2WzHA-otDM_0cyO-MywP4StKWWWouRhraS_JO9f1cUQnk61",
  currency: "USD",
  intent: "capture",
};

const App = () => {
  return (
    <CartProvider>
      <PayPalScriptProvider options={initialOptions}>
      <Router>
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
              <Route path="/products/:slug" element={<DetailsScreen />} />
              <Route path="/Cart" element={<Cart />} />
              <Route
                path="/Profile"
                element={<Profile />}
              />
              <Route path="/Changeemail" element={<ChangeEmail />} />
              <Route path="/Changepassword" element={<ChangePassword />} />
              <Route path="/Address" element={<Adress />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/AccountSettings" element={<AccountSettings />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/explore-page" element={<ExplorePage />} />
              <Route path="/Checkoutcart" element={<Checkoutcart />} />
              
                <Route path="/OrderProcessing" element={<OrderProcessing />} />
              
            </Routes>
          </div>
        </div>
      </Router>
      </PayPalScriptProvider>
    </CartProvider>
  );
};

export default App;
