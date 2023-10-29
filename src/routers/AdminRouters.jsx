import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../admin/Admin';
import RoleDetailsTable from '../admin/components/RoleDetailsTable';

const AdminRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />} />
        <Route path="/:role-details/:roleId" element={<RoleDetailsTable />} />
      </Routes>
    </div>
  );
};

export default AdminRouters;
