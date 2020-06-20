import React, { Component } from 'react';

//import project.js component
import { Project } from './Components/project'
import './App.css';

class App extends Component {

  render() {

    return (

      <div className="App">

        <h1>Web Projects</h1>
        <br />

        {/* Call the project.js component to run */}
        <Project />
      </div>
    );
  }
}

export default App;
