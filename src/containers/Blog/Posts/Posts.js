import React , {Component} from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import fullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
    }
    selectPostHandler = (postId) => {
        this.props.history.push({pathname: '/posts/' + postId});
    }
    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.splice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                console.log(updatedPosts);
                this.setState({
                    posts: updatedPosts
                });
            }).catch(error => {
                console.log(error);
            });
        console.log(this.state.selectedPostId);
    }
    render(){
        const posts = this.state.posts.map(post => {
            return (
                <Post 
                    title={post.title}
                    key={post.id}
                    author={post.userId}
                    clicked={this.selectPostHandler.bind(this, post.id)}/>
            )
            
        })
        return ( 
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/posts/:id" exact component={fullPost} />
                {/* <Route path={this.props.match.url + '/:id'} exact component={fullPost} /> */}
            </div>
            
        )
    }
}
export default Posts;