import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        postDetails: null
    }
    componentDidMount(){
        this.loadData();
    }
    componentDidUpdate(){
        this.loadData();
    }
    loadData = () => {
        if (this.props.match.params.id) {
            if (this.state.postDetails && this.state.postDetails.id !== this.props.match.params.id) {

            }
            axios.get("/posts/" + this.props.match.params.id)
                .then(response => {
                    this.setState({postDetails: response.data})
                }).catch(error => {
                    console.log(error);
            })
            console.log(this.props);
        }
    }
    deletePost = (postId) => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            })
    }
    render () {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if(this.props.match.params.id){
            post = <p style={{ textAlign: 'center' }}>Loading...</p>
        }
        if(this.state.postDetails) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.postDetails.title}</h1>
                    <p>{this.state.postDetails.body}</p>
                    <div className="Edit">
                        <button
                             className="Delete"
                             onClick={this.deletePost}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
        
    }
}
 
export default FullPost;