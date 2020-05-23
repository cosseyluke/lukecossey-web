import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { PostIndex } from './Post';


function App() {
  return (
    <Router>
      <Switch>
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

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
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
