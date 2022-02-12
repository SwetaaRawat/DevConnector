import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { getPost } from '../../actions/post';
import { useParams, NavLink} from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';


const Post = ({getPost, post: {post, loading} }) => {
    const{id} = useParams()
    useEffect(() => {
        getPost(id);
    }, [ getPost, id ])
  return (
  <div className='container'>
  {loading || post === null ? <Spinner/> : <Fragment>
      <NavLink to='/posts' className='btn btn-light'>Back To Posts</NavLink>
      <PostItem post={post} showActions={false}/>
      <CommentForm postId={post._id}/> 
      <div className='comments'>
          {post.comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} postId={post._id}/>
          ))}
      </div>
  </Fragment>}
  </div>
  )};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);