import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
  } from 'react-router-dom';

import App from './App';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={<HomeScreen />} /> 
        <Route path='/book/:id' element={<BookScreen />} />
      </Route>
    )
);
