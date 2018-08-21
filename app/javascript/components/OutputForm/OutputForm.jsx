import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class OutputForm extends Component {

	constructor(props)
	{
		super(props)
		this.state = {
			data: [],
		}
		this.editChange = this.editChange.bind(this);
		this.handleDeleteChange = this.handleDeleteChange.bind(this);
	}

	editChange(data,index){
		this.props.handleEditChange(data,index);
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			data: nextProps.data
		})
	}

	handleDeleteChange(id,index){
		axios.delete(`http://localhost:3000/forms/${id}`)
      .then(res => {
        this.state.data.splice(index, 1);
        this.setState({
        	data: this.state.data
        });
      })
	}

 	render(){
		let data = this.state.data || [];
		return(
				<Table>
	        <thead>
	          <tr>
	          	<th>EMAIL</th>
	          	<th>PASSWORD</th>
	          	<th>ROLE</th>
	            <th>NAME</th>
	            <th>AGE</th>
	            <th>GENDER</th>
	            <th>PROFILE PICTURE</th>
	            <th>CITY</th>
	            <th>ACTION</th>
	          </tr>
	        </thead>
	        <tbody>
						{ 
			 			this.state.data.map((item,index) =>           	
		          <tr key={item.id}>
		          	<th scope="row">{item.email}</th>
		          	<th scope="row">{item.password}</th>
		          	<th scope="row">{item.role}</th>
		            <th scope="row">{item.name}</th>
		            <td>{item.age}</td>
		            <td>{item.gender}</td>
		            <td>		            
				          <img src={item.profile_picture} alt={item.name}/>
		            </td>
		            <td>{item.city}</td>
		            <td>
		            	<Button color="primary" onClick= {()=>{this.editChange(data,index)}} size="sm" > EDIT</Button> &nbsp;           
		            	<Button color="danger" onClick= {()=>{this.handleDeleteChange(item.id,index)}} size="sm" > DELETE</Button>
		            </td>

		          </tr>         
	      		)}
	      </tbody>
	      </Table>  
			);
		}
	}
export default OutputForm;
