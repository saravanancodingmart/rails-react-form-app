import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Col,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import OutputForm from '../OutputForm/OutputForm.jsx';
 
class InputForm extends Component {	
	constructor(props){
		super(props);
		this.state ={
			data: [],
      id: '',
      email: '',
      password: '',
      role: 'Admin',
      name: '',
      age: '',
      gender: 'Male',
      profile_picture: '',
      city: '',
      editStatus: false,
      editIndex: '',
      file: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  
  componentDidMount() {
      axios.get(`http://localhost:3000/forms`)
      .then(res => {
        const data = res.data.data;
        this.setState({ data });
      })
  }


	handleChange(event)
	{
     if(event.target.name === "profile_picture")
    {
      event.preventDefault();
      var file = event.target.files[0]
      var reader = new FileReader(); 
      reader.onloadend = () => {
        this.setState({
          file: file,
          profile_picture: reader.result
        });
      }
     reader.readAsDataURL(file);
    }
    else
    {
      let state = this.state;
      state[event.target.name] = event.target.value;
      this.setState({state})
    }
  }

  handleCityChange(city){
  	this.setState({	city });
  }

  handleEditChange(data,index){
    var selectedData = data[index];
    var city = selectedData.city;
    var editStatus = true;
    var editIndex = index;
    var city = { value: city, label: city }
    this.setState({
      id: selectedData.id,
      email: selectedData.email,
      password: selectedData.password,
      role: selectedData.role,
      name: selectedData.name, 
      age: selectedData.age,
      gender: selectedData.gender,
      profile_picture: selectedData.profile_picture,
      city: city,
      editStatus: editStatus,
      editIndex: editIndex
    });
  }

  formSubmit(){
  	var item = {
      id: this.state.id,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
  		name: this.state.name, 
  		age: this.state.age,
  		gender: this.state.gender,
  		profile_picture: this.state.profile_picture,
  		city: this.state.city.value,
      file: this.state.file
  	};
  	var myArray = this.state.data;
    var index = this.state.editIndex;
    if (this.state.editStatus === true)
    {
      myArray[index] = item;
      axios.put(`http://localhost:3000/forms/${this.state.id}`, { item })
      .then(res => {
        console.log("Edit operation done successfully");
      })
    }
    else
    {
      myArray.push(item);
      axios.post(`http://localhost:3000/forms`, { item })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(error =>{
        console.log(error);
      });
    } 	
  	this.setState({
      data: myArray,
      id: '',
      email: '',
      password: '',
      role: 'Admin',
      name: '', 
  		age: '',
  		gender: 'Male',
  		profile_picture: '',
  		city: '',
      editStatus: false,
      editIndex: '',
      file: ''
    });
  }

  render() {
  	const options = [
	  	{ value: 'Chennai', label: 'Chennai' },
	  	{ value: 'Bangalore', label: 'Bangalore' },
	  	{ value: 'Coimbatore', label: 'Coimbatore' }
  	];
    let data = this.state.data;
    return (
    	<Container>
	    	<Form>
            <FormGroup row>
            <Label for="formEmail" sm={2}>Email</Label>
            <Col sm={10}>
            <Input type="email" value={this.state.email || ''} onChange={this.handleChange} name="email" id="formEmail" placeholder="Enter email .." required/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="formPassword" sm={2}>password</Label>
            <Col sm={10}>
            <Input type="password" value={this.state.password || ''} onChange={this.handleChange} name="password" id="formPassword" placeholder="Enter password .." required/>
              
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="formRole" sm={2}>Role</Label>
            <Col sm={10}>
            <Input type="select" value={this.state.role || ''} onChange={this.handleChange} name="role" id="formRole" placeholder="Enter Role .." required>
              <option>Admin</option>
              <option>Developer</option>
            </Input>
            </Col>
          </FormGroup>

	    	   <FormGroup row>
	          <Label for="formName" sm={2}>Name</Label>
	          <Col sm={10}>
	          <Input type="text" value={this.state.name || ''} onChange={this.handleChange} name="name" id="formName" placeholder="Enter Name .." required/>
	          </Col>
	        </FormGroup>
	         <FormGroup row>
	          <Label for="formAge" sm={2}>Age</Label>
	          <Col sm={10}>
	          <Input type="number" value={this.state.age || ''} onChange={this.handleChange} name="age" id="formAge" placeholder="Enter Age .." />
	          </Col>
	        </FormGroup>
	        <FormGroup row>
	          <Label for="formGender" sm={2}>Gender</Label>
	          <Col sm={10}>
		          <Input type="select" value={this.state.gender} onChange={this.handleChange} name="gender" id="formGender" placeholder="Select Gender ..">
		            <option>Male</option>
		            <option>Female</option>
		          </Input>
		        </Col>
	        </FormGroup>
	        <FormGroup row>
	          <Label for="formSelectPicture" sm={2}>Profile Picture</Label>
	          <Col sm={10}>
		          <input type="file" onChange={this.handleChange} name="profile_picture" id="formSelectPicture"/>
		          <FormText color="muted">
		            Select the Profile Picture with correct extension..
		          </FormText>
		        </Col>
	        </FormGroup>
	        <FormGroup row>
	        	<Label for="formSelectCity" sm={2}>City</Label>
	        	<Col sm={10}>
			        <Select
			        value={this.state.city}
			        name="city"
			        onChange={this.handleCityChange}
			        options={options}
			        />
			      </Col>
	        </FormGroup>
	         <Button color="primary" onClick= {()=>{this.formSubmit()}} size="sm" > Submit</Button>
	       </Form>
         <br/>
         <OutputForm data={data} handleEditChange={this.handleEditChange}/>
       </Container>
    	);
  }
}
export default InputForm;
