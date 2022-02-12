import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { useNavigate ,Navigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, FormGroup, Input } from "reactstrap";
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Select from "react-select";



const EditProfile = ({ 
    profile:{profile, loading}, 
    auth, 
    getCurrentProfile, 
    createProfile:createProfileForUser
}) => {
  const [ formData, setFormData ] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: [],
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  

  useEffect(() => {
    getCurrentProfile();
    
    setFormData({
        company: loading|| !profile.company ? '' : profile.company,
        website: loading|| !profile.website ? '' : profile.website,
        location: loading|| !profile.location ? '' : profile.location,
        status: loading|| !profile.status ? '' : profile.status,
        skills: loading|| !profile.skills ? '' : profile.skills,
        githubusername: loading|| !profile.githubusername ? '' : profile.githubusername,
        bio: loading|| !profile.bio ? '' : profile.bio,
        twitter: loading|| !profile.twitter ? '' : profile.twitter,
        facebook: loading|| !profile.facebook ? '' : profile.facebook,
        linkedin: loading|| !profile.linkedin ? '' : profile.linkedin,
        youtube: loading|| !profile.youtube ? '' : profile.youtube,
        instagram: loading|| !profile.instagram ? '' : profile.instagram
    });
 }, [auth.isAuthenticated, getCurrentProfile]);

  const navigate = useNavigate();

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  if (!auth.isAuthenticated && !auth.loading) return <Navigate to="/login" />;

  const {
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
     } = formData;

  const professionalStatus = [
    { label: "Developer", value: "Developer" },
    { label: "Junior developer", value: "Junior developer" },
    { label: "Senior Developer",value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning",  value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other",  value: "Other" },
   ];
  

  const handleChange = (fieldName, fieldValue) => setFormData({...formData, [fieldName]: fieldValue});
  
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      skills: formData.skills
      .toString()
      .split(',')
      .map((item) => item
      .trim())
      .filter((item) => item.length > 0),
    };
    console.log(data);

    createProfileForUser(data, navigate, true);
  };
  
  return (
    <div className="container">
      <h2 className="large text-info">Edit Your Profile</h2>
      <p className="lead">
        <FontAwesomeIcon icon={["fas", "user"]} color="#00b7eb"/>
        {"  "}
        <strong>
          Let's get some information to make your profile stand out
        </strong>
      </p>
      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" >
        <FormGroup>
          <Select
          name="status"
          value={{label:status}}
          placeholder="*Select Professional Status" 
          options={professionalStatus} 
          onChange={e => handleChange("status", e.value)}
          />
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </FormGroup>

        <FormGroup>
          <Input 
          type="text" 
          name="company" 
          placeholder="*Company"  
          value={company} 
          onChange={e => handleChange("company", e.target.value)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </FormGroup>

        <FormGroup>
          <Input 
          type="text" 
          name="website" 
          placeholder="*Website" 
          value={website} 
          onChange={e => handleChange("website", e.target.value)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </FormGroup>

        <FormGroup>
          <Input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={location} 
          onChange={e => handleChange("location", e.target.value)} />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </FormGroup>

        <FormGroup>
          <Input 
          type="text" 
          name="skills" 
          placeholder="*Skills" 
          value={skills} 
          onChange={e => handleChange("skills", e.target.value)} />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </FormGroup>

        <FormGroup>
          <Input
            type="text"
            name="githubusername"
            placeholder="Github Username"
            value={githubusername} 
            onChange={e => handleChange("githubusername", e.target.value)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </FormGroup>
        
        <FormGroup>
          <Input 
          type="textarea" 
          name="bio" 
          placeholder="Bio" 
          value={bio} 
          onChange={e => handleChange("bio", e.target.value)}/>
          <small className="form-text">Tell us a little about yourself</small>
        </FormGroup>

        {displaySocialInputs ? (
          <div>
            <Button
              onClick={() => {
                setFormData({
                  ...formData,
                  instagram: "",
                  twitter: "",
                  facebook: "",
                  youtube: "",
                  linkedin: "",
                });
                toggleSocialInputs(!displaySocialInputs);
              }}
              className="btn btn-light"
            >
              Remove Social Network Links
            </Button>

        <div className="form-group social-input d-flex">
          <FontAwesomeIcon
            icon={["fab", "twitter"]}
            color="#1da1f2"
            className="my-auto"
            size="lg"
          />

          <Input
            style={{ marginLeft: "1rem" }}
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={twitter} 
            onChange={e => handleChange("twitter", e.target.value)}
          />
        </div>

        <div className="form-group social-input d-flex">
          <FontAwesomeIcon
            icon={["fab", "facebook"]}
            color="#1877f2"
            className="my-auto"
            size="lg"
          />
          <Input
            style={{ marginLeft: "1rem" }}
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={facebook} 
            onChange={e => handleChange("facebook", e.target.value)}
          />
        </div>

        <div className="form-group social-input d-flex">
          <FontAwesomeIcon
            icon={["fab", "youtube"]}
            color="#ff0000"
            className="my-auto"
            size="lg"
          />
          <Input
            style={{ marginLeft: "0.8rem" }}
            type="text"
            name="youtube"
            placeholder="Youtube URL"
            value={youtube} 
            onChange={e => handleChange("youtube", e.target.value)}
          />
        </div>

        <div className="form-group social-input d-flex">
          <FontAwesomeIcon
            icon={["fab", "linkedin"]}
            color="#0a66c2"
            className="my-auto"
            size="lg"
          />
          <Input
            style={{ marginLeft: "1.1rem" }}
            type="text"
            name="linkedin"
            placeholder="Linkedin URL"
            value={linkedin} 
            onChange={e => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="form-group social-input d-flex">
          <FontAwesomeIcon
            icon={["fab", "instagram"]}
            color="#c32aa3"
            className="my-auto"
            size="lg"
          />
          <Input
            style={{ marginLeft: "1.1rem" }}
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            value={instagram} 
            onChange={e => handleChange("instagram", e.target.value)}
          />
        </div>
      </div>
       ) : (
          <div className="my-2">
            <Button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              className="btn btn-light"
            >
              Add Social Network Links
            </Button>
            <span>Optional</span>
          </div>
        )}

        <div className="w-100 d-flex">
          <Input
            type="submit"
            name="submit"
            className="btn-info w-auto h-auto my-auto"
            onClick={onSubmit}
          /><br/><br/>

          <NavLink to="/dashboard">
            <Button className="btn-light my-2"> Go back</Button>
          </NavLink>
        </div>
    </form>
  </div>
  );
};

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile})(EditProfile);