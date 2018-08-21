import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../header/header.jsx';
import InputForm from '../InputForm/InputForm.jsx';
class App extends Component {
  render() {
    return (
      <div className="App">       
        <Header title="FORM_APP"/> 
        <br/>
        <InputForm/>
      </div>
    );
  }
}

export default App;
