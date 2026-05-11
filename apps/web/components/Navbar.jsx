// components/Navbar.jsx
import React from 'react';
import {NavEmp} from './NavEmp';
import {NavOther} from './NavOther';

export const Navbar = ({ user }) => {
    const isEmployee = user?.DTYPE === 'EMPLOYEE' || user?.DTYPE === 'Employee';

  return (
    <>
      {isEmployee ? <NavEmp user={user} /> : <NavOther user={user} />}
    </>
  );
}
