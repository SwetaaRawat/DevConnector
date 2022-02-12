import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate } from 'react-router-dom';


const Profiles = ({ 
  getProfiles,
  auth: { isAuthenticated, authloading }, 
  profile:{ profiles, loading } 
}) => {
 useEffect(() => {
 getProfiles();
 }, [getProfiles]);

 if (!isAuthenticated && !authloading) return <Navigate to="/login" />;

  return <Fragment>
    { loading ? <Spinner /> : <Fragment>

      
    <div className="container">
    <h2 className="large text-info">Developers</h2>
    <p className="lead">
      <FontAwesomeIcon icon={["fab", "connectdevelop"]} />
      {"  "}
      <strong>
        Browse and connect with developers
      </strong>
    </p>
    <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
        ))
        ) : <h4>No Profile found...</h4>}
        </div>
</div>
    </Fragment>
    }
    </Fragment>
  };
   


Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfiles})(Profiles);
