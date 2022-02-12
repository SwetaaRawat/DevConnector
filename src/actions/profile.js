import axios from "axios";
import { setAlert } from "./alert";
import { 
  ACCOUNT_DELETED, 
  GET_PROFILE, 
  PROFILE_ERROR, 
  UPDATE_PROFILE, 
  CLEAR_PROFILE, 
  GET_PROFILES,
  GET_REPOS 
} from "./types";
import { BASE_URL } from "./../config/default";





//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  console.log("Profile Requested");
  try {
    const res = await axios.get(BASE_URL + "/api/profile/me");
    console.log("Profile data", res);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {

   dispatch({ type: CLEAR_PROFILE});

  try {
    const res = await axios.get(BASE_URL + "/api/profile ");
    console.log("Profiles", res);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

//Get profiles by ID
export const getProfileById = userId => async (dispatch) => {

 try {
   const res = await axios.get(BASE_URL + `/api/profile/user/${userId}`);
   

   dispatch({
     type: GET_PROFILE,
     payload: res.data,
   });
 } catch (err) {
   console.log(err);
   dispatch({
     type: PROFILE_ERROR,
     payload: {
       msg: err.response.data.msg,
       status: err.response.status,
     }
   });
 }
};

//Get Github Repository
export const getGithubRepos = username => async (dispatch) => {
try {
  const res = await axios.get(BASE_URL + `/api/profile/github/${username}`);
  
  dispatch({
    type: GET_REPOS,
    payload: res.data,
  });
  
} catch (err) {
  console.log(err);
  dispatch({
    type: PROFILE_ERROR,
    payload: {
      msg: err.response.data.msg,
      status: err.response.status,
    },
  });
}
};

  //Create or update profile
export const createProfile = (formData, navigate, edit = false) => async (dispatch) => {
   try {
     const config = {
       headers: {
         'Content-Type': 'application/json'
       }
     }

     const res = await axios.post(BASE_URL+'/api/profile', formData, config);

     dispatch({
       type: GET_PROFILE,
       payload: res.data
     });
      
     dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'));
     
     if(!edit){
      navigate('/dashboard');
    }
     
   } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      
    }
     
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.statusTest,
        status: err.response.status,
      },
    });
   }
};

// Add Experience
export const addExperience = (formData, navigate) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(BASE_URL+'/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
     
    dispatch(setAlert('Experience Added', 'success'));
    navigate('/dashboard');
   
    
  } catch (err) {
   const errors = err.response.data.errors;
   console.log(errors);

   if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     
   }
    
   dispatch({
     type: PROFILE_ERROR,
     payload: {
       msg: err.response.data.statusTest,
       status: err.response.status,
     },
   });
  }
};

// Add Education
export const addEducation = (formData, navigate) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put(BASE_URL+'/api/profile/education', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
     
    dispatch(setAlert('Education Added', 'success'));
    navigate('/dashboard');
   
    
  } catch (err) {
   const errors = err.response.data.errors;
   console.log(errors);

   if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
     
   }
    
   dispatch({
     type: PROFILE_ERROR,
     payload: {
       msg: err.response.data.statusTest,
       status: err.response.status,
     },
   });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(BASE_URL+`/api/profile/experience/${id}`);
     
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.statusTest,
        status: err.response.status,
      },
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(BASE_URL+`/api/profile/education/${id}`);
     
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.data.statusTest,
        status: err.response.status,
      },
    });
  }
};

// Delete account & Profile
export const deleteAccount = () => async dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')){
    try {
     await axios.delete(BASE_URL+'/api/profile');
       
      dispatch({type: CLEAR_PROFILE});
      dispatch({type: ACCOUNT_DELETED});
  
      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.data.statusTest,
          status: err.response.status,
        },
      });
    }
  }
  
};


