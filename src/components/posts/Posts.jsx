import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { Navigate } from 'react-router-dom';

const Posts = ({ getPosts, post:{posts, loading}, auth: {isAuthenticated, authloading}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    if (!isAuthenticated && !authloading) return <Navigate to="/login" />; 

  return (
    <div className='container'>
     {loading ? <Spinner/> : <Fragment>
      <h1 className='large text-info'>Posts</h1>
      <p className='lead' height='3rem' weight='10rem'>
          <FontAwesomeIcon icon={["fas", "user"]}/> Welcome to the community
      </p>
      <PostForm/>
      <div className='posts'>
        {posts.map(post => (
            <PostItem key={post._id} post={post}/>
        ))}
      </div>
  </Fragment>}
  </div>
  )};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, {getPosts})(Posts);