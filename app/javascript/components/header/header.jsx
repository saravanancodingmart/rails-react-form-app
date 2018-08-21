import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./header.css";
import logo from './logo.svg';

class Header extends Component{

	constructor(props){
		super(props);
		this.state ={
			title: this.props.title
		}
	}
	render(){
		let title = this.state.title;
		return(
			<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{title}</h1>
        </header>
      );
	}
}
export default Header;