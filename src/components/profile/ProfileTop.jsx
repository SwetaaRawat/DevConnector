import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileTop = ({ profile:{
    status,
    company,
    location,
    website,
    social,
    user: {name, avatar},
    
} }) => {
  return (
   
    <div className="profile-top bg-info p-2">
  <img
    className="round-img my-1"
    src={avatar}
    alt=""
  />

  <h1 className="large" style={{color:'white'}}>{name}</h1>
  <p className="lead" style={{color:'white'}}>
    <strong>{status}{company && <span> at {company}</span>}</strong>
  </p>

  <p style={{fontWeight:'bold', color:'white'}}>{location && <span>{location}</span>}</p>
  <div className="icons my-1">
      {
          website && (
            <a href={website} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fas", "globe"]} />
            </a>
      )}

      {social && social.twitter && (
            <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
      )}
     
     {social && social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer">
             <FontAwesomeIcon icon={["fab", "facebook"]} />
           
            </a>
     )}

    {social && social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
             <FontAwesomeIcon icon={["fab", "linkedin"]} />
            </a>
    )}
    
    {social && social.youtube &&(
              <a href={social.youtube} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "youtube"]} />
              
             </a>
    )}
   
   {social && social.instagram &&(
            <a href={social.instagram} target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={["fab", "instagram"]} />
             </a>
   )}
    
  </div>
</div>

  )
  
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};



export default ProfileTop;

