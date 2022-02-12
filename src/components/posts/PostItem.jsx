import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addLike, removeLike, deletePost } from '../../actions/post';


const PostItem = ({ 
  auth,
  deletePost, 
  addLike,
  removeLike,
  post: { _id, text, name, avatar, user, likes, unlikes, comments, date},
  showActions
}) => {
  return (
    
    <div class="post bg-white p-1 my-1">
          <div>
          <NavLink style={{ textDecoration: 'none' }} to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="" />
          <h4 style={{color: '#00b7eb'}}>{name}</h4>
           </NavLink>
           
          </div>

          <div>
            <p class="my-1">
              {text}
            </p>

             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
            
            {showActions && <Fragment>

              <button onClick={e => addLike(_id)} type="button" class="btn btn-light alert-dark">
              <FontAwesomeIcon icon={['fas', 'thumbs-up']} />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
              </button>

              <button onClick={e => removeLike(_id)} type="button" class="btn btn-light alert-dark" >
              <FontAwesomeIcon icon={['fas', 'thumbs-down']} />{' '}
              <span>{unlikes.length > 0 && <span>{unlikes.length}</span>}</span>
              </button>

              <NavLink to={`/posts/${_id}`} ><button class="btn btn-info">
              Discussion {comments.length > 0 && (
              <span class='comment-count'>{comments.length}</span>
              )}</button>
               </NavLink>

              {!auth.loading && user === auth.user._id &&(
                <button      
                  type="button"
                  class="btn btn-danger"
                  onClick={e => deletePost(_id)}
                >
                  <FontAwesomeIcon icon={["fas", "trash"]}/> Delete
                </button>
            )}

            </Fragment>}

        </div>
      </div> 
   )
}

PostItem.defaultProps = {
   showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike,removeLike, deletePost})(PostItem);