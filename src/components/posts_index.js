import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends React.Component {
    componentDidMount() {
        this.props.fetchPosts(); // will init the api request once the component displayed
    }

    renderPostsWithLodash() { // now we have an object so we can't use js map, instead use lodash map
        console.log(this.props.posts);
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post._id}>
                    {post.title}
                    <Link to={`/posts/${post._id}`}>
                        Details  
                    </Link>
                    <Link to={`/blogs/edit`}>
                        Edit
                    </Link>
                </li>
            );
        })
    }

    renderPosts() {
        return this.props.posts.map((post) => { // js map, good for arrays
            return (
                <li className="list-group-item" key={post._id}>
                    <Link to={`/posts/${post._id}`}>
                    {post.title}
                    </Link>                    
                </li>
            );
        });
    }

    render() {
        // console.log(this.props.posts);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPostsWithLodash()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);