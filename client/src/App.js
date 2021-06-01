import 'normalize.css'

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss'

import { AdminComponent } from './admin';
import { ListenPage } from './Listen';
import { PostIndex, PostDetail } from './Post';

function AdminDashboard() {
  return (
    <Switch>
      <Route path="/admin" component={AdminComponent} />
    </Switch>
  )
}

function WebApp() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/log/:slug" component={PostDetail} />
        <Route path="/log">
          <PostIndex />
        </Route>
          <Route path="/">
          <Home />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/admin' component={AdminDashboard} />
        <Route path='/' component={WebApp} />
      </Switch>
    </Router>
  )
}

function Header() {
  return (
    <header className="main-header structural">
      <div className="header-title">
        <h3>
          <Link to={"/"}>Luke Cossey</Link>
          <Link to={"/log"}>Log</Link>
        </h3>
      </div>
    </header>
  )
}

function Home() {
  return (
    <div className="home-wrap">
      <p>Software Engineer</p>
      <p>&nbsp;</p>
			<p>
        <a href="https://github.com/cosseyluke" target="_blank">GitHub</a>
        <br />
        <a href="https://www.linkedin.com/in/luke-cossey/" target="_blank">LinkedIn</a>
      </p>
		</div>
  )
}

export default App;
