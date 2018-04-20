import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends React.Component {
    componentDidMount() {
        this.props.fetchPosts(); // will init the api request once the component displayed
    }

    renderPostsWithLodash() { // now we have an object so we can't use js map, instead use lodash map
    return _.map(this.props.posts, post => {
        return (
            <li className="list-group-item" key={post.id}>                
                {post.title} - {post.content}                
            </li>
        );
    })
}

    renderPosts() { 
        return this.props.posts.map((post) => { // js map, good for arrays
            return (
                <li>
                    key={post.id}
                    {post.title}
                    {post.content}
                </li>
            );
        });
    }

    render() {
        console.log(this.props.posts);
        return (
            <div>
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