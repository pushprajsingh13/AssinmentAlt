import './App.css';
import React  from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Registration from './pages/registration';
import CustomersList from './pages/customersList';
import UpdateCustomer from './pages/updateCustomer';

const App=()=> {
  return (
    <>
    <Routes> 
      <Route exact path="/" element={<Registration />}/>
      <Route exact path="/customers-list" element={<CustomersList />}/>
      <Route exact path="/update-customer/:Id" element={<UpdateCustomer />}/>
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
      
    </>
  );
};

export default App;
