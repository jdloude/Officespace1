
 import React, { Component } from 'react';
import './form.css';
import classNames from 'classnames'
import _ from 'lodash'
import {isEmail} from '../helpers/email'
import {createUser, login} from '../helpers/user'

export default class LoginForm extends Component{

	constructor(props){
		super(props);

		this.state = {
			message: null,
			isLogin: true,
			user: {
				name: "",
				email: "",
				password: "",
				confirmPassword: ""
			},

			error: {
				name: null,
				email: null,
				password: null,
				confirmPassword: null,
			}
		}


		this._onSubmit = this._onSubmit.bind(this)
		this._onTextFieldChange = this._onTextFieldChange.bind(this);
		this._formValidation = this._formValidation.bind(this)
	}

	_formValidation(fieldsToValidate = [], callback = () => {}){
		const {isLogin, user} = this.state;

		const allFields = {

			name: {
				message: "Your name is required.",
				doValidate: () => {
					const value = _.trim(_.get(user, 'name', ""));

				
					if(value.length > 0){
						return true;
					}

					return false;
				}
			},

			email: {
				message: "Email is not correct",
				doValidate: () => {

					const value = _.get(user, 'email', '');

					if(value.length >0 && isEmail(value)){

						return true;
					}
					return false;
				}
			},

			password: {
				message: "Password shoud has more than 3 characters.",
				doValidate: () => {


					const value = _.get(user, 'password', '');


					if(value && value.length > 3){

							return true;
					}

					return false;

				}
			},

			confirmPassword: {
				message: "Password does not match.",
				doValidate: () => {


					const passwordValue = _.get(user, 'password');
					const value = _.get(user, 'confirmPassword', '');


					if(passwordValue === value){
							return true;
					}

					return false;

				}
			}

		};



		let errors = this.state.error;

		_.each(fieldsToValidate, (field) => {

				const fieldValidate = _.get(allFields, field);
				if(fieldValidate){

					errors[field] = null;

					const isFieldValid = fieldValidate.doValidate();

					if(isFieldValid === false){
						errors[field] = _.get(fieldValidate, 'message');
					}
				}

		});



		this.setState({
			error: errors,
		}, () => {
		
			console.log("After processed validation the form errors", errors);

			let isValid = true;

			_.each(errors, (err) => {

				if(err){
					isValid = false;

				}
			});

			callback(isValid);

		})

		

	}
	_onSubmit(event){

		const {isLogin,user} = this.state; 
		event.preventDefault();


		let fieldNeedToValidate = ['email', 'password'];

		if(!isLogin){

			fieldNeedToValidate = ['name', 'email', 'password', 'confirmPassword'];
		}


		this._formValidation(fieldNeedToValidate,(isValid) => {


				console.log("The form is validated? ", isValid);


				if(isValid){

					// send request to backend
					if(isLogin){
						// do send data for login endpoint

						login(this.state.user.email, this.state.user.password).then((response) => {

							/// login success

							this.setState({
								message: {
									type: 'success',
									message: 'Login successful.'
								}
							});


						}).catch((err) => {


							// login not suscess.
							this.setState({
								message: {
									type: 'error',
									message: 'An error login!'
								}
							});
							console.log(err);
						})


					}else{
						console.log("got this far...");
						createUser(this.state.user).then((response) => {

							console.log("Hey i got data after send post", response);
						});
					}
					

				}
				//console.log("FOrm is submitted as: ", isLogin  ? "Login" : "Register", 'data:', user);

		});

		
	}

	_onTextFieldChange(e){

		let {user} = this.state;


		const fieldName = e.target.name;
		const fieldValue = e.target.value;


		user[fieldName] = fieldValue;

		this.setState({user: user});



	}
	render()
	{
		return(
			<div className="card">
			<div className="user-form shadow">
			<p className="font-form paragraph-header">Clients</p>
			<div className="form-group">
                    <label htmlFor="inputTextUsername">Username</label>
                    <input onKeyUp={this.onTextFieldChange} type="text" className="form-control" id="inputTextUsername" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputTextPassword">Password</label>
                    <input onKeyUp={this.onKeyUpInputTextPassword} type="text" className="form-control" id="inputTextPassword" placeholder="Password"/>
                </div>
                 <div className="form-group">
                    <label htmlFor="inputTextAccount">Account</label>
                    <input onKeyUp={this.onKeyUpInputTextAccount} type="text" className="form-control" id="inputTextAccount" placeholder="Account"/>
                </div>
                 
                 <div className="form-group">
                    <label htmlFor="inputTextEmail">Email</label>
                    <input onKeyUp={this.onKeyUpInputTextEmail} type="text" className="form-control" id="inputTextEmail" placeholder="Email"/>
                </div>
                 <div className="form-group">
                    <label htmlFor="inputTextBucket">Bucket</label>
                    <input onKeyUp={this.onKeyUpInputTextBucket} type="text" className="form-control" id="inputTextBucket" placeholder="Bucket"/>
                </div>
				 <div className="form-group">
                    <label htmlFor="inputTextImgUrl">Image URL</label>
                    <input onKeyUp={this.onKeyUpInputTextImgUrl} type="text" className="form-control" id="inputTextImgUrl" placeholder="URL"/>
                </div>

                 <div className="form-group">
                    <label htmlFor="inputTextCreatedAt">Created At</label>
                    <input onKeyUp={this.onKeyUpInputTextCreatedAt} type="text" className="form-control" id="inputTextCreatedAt" placeholder="Created at"/>
                </div>


                 <div className="form-group">
                    <label htmlFor="inputTextUpdatedAt">Updated At</label>
                    <input onKeyUp={this.onKeyUpInputTextUpdatedAt} type="text" className="form-control" id="inputTextUpdatedAt" placeholder="Updated at"/>
                </div>

  					<div className="form-group">
                    <label htmlFor="inputSelectRegion">Region</label>
                    <select onChange={this.onChangeInputSelectRegion} className="form-control" 
                    id="inputSelectRegion" >


                    <option value="option">Select Region</option>
  					<option value="option">US-East-1 (Ohio)</option>
 					<option value="option">US-East-2 (N. Virginia)</option>
 					 <option value="option">US-West-1 (Oregon)</option>
 					 <option value="option">US-West-2 (N. California)</option>
 					 <option value="option">EU-West-1 (Ireland)</option>
 					<option value="option">EU-West-2 (London)</option>
 					 <option value="option">EU-West-3 (Paris)</option>

				</select>

						</div>		 

		  <button onClick={() => {this.setState({isLogin: true})}} className="btn btn-info w-10">Submit</button>
                </div>
	 </div>
			);
	}
}

export default UserForm;

