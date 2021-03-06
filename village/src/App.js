import React, { Component } from 'react';
import {Route} from "react-router-dom";
import axios from "axios";

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import NavigationBar from "./components/NavigationBar";
import Smurf from './components/Smurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount() {
    axios.get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState({
          smurfs: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  addToSmurfList = (smurfData) => {
    this.setState({
      smurfs: smurfData,
    })
  }

  deleteSmurf = (id) => {
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        this.setState({
          smurfs: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  updateSmurf = (id) => {
  //   console.log(id)
  //   axios.put(`http://localhost:3333/smurfs/${id}`, {name,age,height})
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err))
  }
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <NavigationBar />
        <Route exact path="/"
          render={(props) => <Smurfs {...props} smurfs={this.state.smurfs} delete={this.deleteSmurf} update={this.updateSmurf} />}
        />
        <Route path="/smurf-form"
          render={(props) => <SmurfForm {...props} add={this.addToSmurfList} />}
        />
        <Route path="/smurf/:id"
          render={(props) => <Smurf {...props} add={this.addToSmurfList}/>}
        />
      </div>
    );
  }
}

export default App;
