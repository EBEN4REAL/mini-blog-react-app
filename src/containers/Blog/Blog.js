import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import './Blog.css';
import Post from '../../components/Post/Post';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const  asyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});


class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/ " exact>Posts</NavLink></li>
                            <li><NavLink to={{ 
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                             }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post"  component={asyncNewPost}/> : null}
                    <Route path="/posts"  component={Posts} />
                    <Route render={() => <h1>Not foumd</h1>} />
                    <Redirect from="/" to="/posts" />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;