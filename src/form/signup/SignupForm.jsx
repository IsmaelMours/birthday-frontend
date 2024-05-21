/** @format */

import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/auth/AuthContext";

import "./Signup.css";

const SignupForm = () => {
	const { register } = useAuth(); // Accessing register function from AuthProvider
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		firstName: "",
		lastName: "",
		birthDate: "",
		mobile: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Call the register function from useAuth with form data
			await register(formData);
			// Redirect user after successful registration
			navigate("/signin");
		} catch (error) {
			console.error("Error:", error.message); // Log any errors from the server
			// Display error message to the user
		}
	};

	return (
		<div className='signup-container'>
			<form
				className='signup-form'
				onSubmit={handleSubmit}
			>
				<h2>Sign Up</h2>
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						name='username'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='firstName'>First Name</label>
					<input
						type='text'
						id='firstName'
						name='firstName'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='lastName'>Last Name</label>
					<input
						type='text'
						id='lastName'
						name='lastName'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='birthDate'>Birth Date</label>
					<input
						type='date'
						id='birthDate'
						name='birthDate'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='mobile'>Mobile</label>
					<input
						type='text'
						id='mobile'
						name='mobile'
						onChange={handleChange}
					/>
				</div>
				<button type='submit'>Sign Up</button>
				<a
					href='#'
					className='signin-link'
				>
					Already registered? Sign in
				</a>
			</form>
		</div>
	);
};

export default SignupForm;
