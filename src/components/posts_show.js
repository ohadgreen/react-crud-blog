import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions/index';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id); 
        // console.log(this.props); // this doesn't return a post but a promise
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        }); 
    }

    render() {
        const { post } = this.props;
        
        if (!post) {
            return <div>Loading... </div>
        }

        console.log(this.props); // now the post is available

        return (<div>
            <Link to="/">Back to List</Link>
            <button className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
            >Delete Post</button>
            <h3>{post.title}</h3>
            <h6>Categories: {post.category}</h6>
            <p>{post.content}</p>
        </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);