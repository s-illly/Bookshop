import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
  } from 'react-router-dom';

import App from './App';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/OrderListScreen';
import AdminRoute from './components/AdminRoute';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} /> 
        <Route path='/cart' element={<CartScreen />} />
        <Route path='/book/:id' element={<BookScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        {/* Registered users */}
        <Route path='' element={<PrivateRoute />}>       
         <Route path='/shipping' element={<ShippingScreen />} />
         <Route path='/payment' element={<PaymentScreen />} />
         <Route path='/placeorder' element={<PlaceOrderScreen />} />
         <Route path='/order/:id' element={<OrderScreen />} />
         <Route path='/profile' element={<ProfileScreen />} />
        </Route>
        {/* Admin users */}
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
        </Route>
      </Route>
    )
);
