import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

// const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
// const API_KEY = '?key=ogreen77';
const ROOT_URL = "http://localhost:3000/api";

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/blogs`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback) {
    const request = axios.post(ROOT_URL + "/blogs", values)
        .then(() => callback()); // only after the api call completes it will execute the callback nav function
    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(_id) {
    const request = axios.get(`${ROOT_URL}/blogs/${_id}`);
    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/blogs/${_id}`)
        .then(() => callback());
        
    return {
        type: DELETE_POST,
        payload: _id
    }
}