import 'normalize.css'

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss'

import { AdminComponent } from './admin';
import { PostIndex, PostDetail } from './Post';
import { SEO } from './components/seo';

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
        <Route path="/blog/:slug" component={PostDetail} />
        <Route path="/blog">
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
          <Link to={"/blog"}>Blog</Link>
        </h3>
      </div>
    </header>
  )
}

function Home() {
  return (
    <div className="home-wrap">
      <SEO description={'A software engineer with a need to create'} />
      <p>Software Engineer</p>
      <p>&nbsp;</p>
			<p>
        <a href="https://github.com/cosseyluke" target="_blank" rel="noopener noreferrer">GitHub</a>
        <br />
        <a href="https://www.linkedin.com/in/luke-cossey/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
		</div>
  )
}

export default App;
