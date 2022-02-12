import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardActions = () => {
  return (
  <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
      <FontAwesomeIcon icon={["fas", "user"]} color="#00b7eb"/> Edit User
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
      <FontAwesomeIcon icon={["fab", "black-tie"]} color="#00b7eb"/> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
      <FontAwesomeIcon icon={["fas", "graduation-cap"]} color="#00b7eb"/> Add Education
      </Link>
      
</div>
  );
};

export default DashboardActions;
