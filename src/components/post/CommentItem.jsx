import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date },
    auth,
    deleteComment
}) => {
  return (
    
    <div class="post bg-white p-1 my-1" >
          <div>
            <NavLink to={`profile/${user}`}  style={{ textDecoration: 'none' }}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
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
            {!auth.loading && user === auth.user._id && (
              <button onClick={e => deleteComment(postId, _id) } type='button' className='btn btn-danger'>
                  <FontAwesomeIcon icon={['fas', 'trash']}/> Delete
              </button>
            )}
          </div>
        </div>
      
  )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment})(CommentItem);