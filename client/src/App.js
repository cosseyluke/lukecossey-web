import 'normalize.css'

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss'

import { ListenPage } from './Listen';
import { PostIndex, PostDetail } from './Post';


function App() {
  return (
    <Router>
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
			<p>Luke Cossey<br/>PO Box 58<br/>Lyttelton 8841<br/>New Zealand</p>
		</div>
  )
}

function Users() {
  return <h2>Users</h2>;
}

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       apiResponse: "",
//     }
//   }
//
//   callAPI() {
//     fetch("http://localhost:9000/testAPI")
//       .then(res => res.text())
//       .then(res => this.setState({apiResponse: res}))
//       .catch(err => err)
//   }
//
//   componentDidMount() {
//     this.callAPI()
//   }
//
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//         </header>
//         <p className="App-intro">
//           {this.state.apiResponse}
//         </p>
//       </div>
//     );
//   }
// }

export default App;
