import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
import { Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AddEducation = ({ addEducation:addEducationInProfile }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy : '',
        from: '',
        to: '',
        current: false,
        description:''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const{ school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });
    
    const navigate = useNavigate();

    const onSubmit = e =>{
        e.preventDefault();
        addEducationInProfile(formData, navigate);
    };


  return (
  
      <div className="container">
      <h2 className="large text-info">Add Your Education</h2>
      <p className="lead">
        
      <FontAwesomeIcon icon={["fas", "branch"]} />
        <strong>
        Add any school or bootcamp that you have attended
        </strong>
      </p>
      <small className="text-danger">Fields marked with * are required</small>
      <form className="form mt-3" >

        <div class="form-group">
          <input 
          type="text" 
          placeholder="* School or Bootcamp" 
          name="school"
          required 
          value={school} 
          onChange={e => onChange(e)}
          
          />
        </div>

        <div class="form-group">
          <input 
          type="text" 
          placeholder="* Degree or Certificate" 
          name="degree" 
          required 
          value={degree} 
          onChange={e => onChange(e)}
          />
        </div>

        <div class="form-group">
          <input 
          type="text" 
          placeholder="Field Of Study" 
          name="fieldofstudy" 
          value={fieldofstudy} 
          onChange={e => onChange(e)}
          />
        </div>

        <div class="form-group">
          <h4>From Date</h4>
          <input 
          type="date" 
          name="from" 
          value={from} 
          onChange={e => onChange(e)}
          />
        </div>

         <div class="form-group">
          <p>
              <input 
              type="checkbox" 
              name="current" 
              checked={current}
              value={current} 
              onChange={e => {
                  setFormData({...formData, current: !current});
                  toggleDisabled(!toDateDisabled);
              }}
             />{' '} Current School or camp</p>
        </div>

        <div class="form-group">
          <h4>To Date</h4>
          <input 
          type="date" 
          name="to" 
          value={to} 
          onChange={e => onChange(e)}
          disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>

        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description} 
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div className="w-100 d-flex">
          <Input
            type="submit"
            name="submit"
            className="btn-info w-auto h-auto my-auto"
            onClick={onSubmit}
          />

          <NavLink to="/dashboard">
            <Button className="btn-light my-2"> Go back</Button>
          </NavLink>
        </div>

        </form>
      </div>
      
  )
};

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired
};

export default connect(null, {addEducation})(AddEducation);
