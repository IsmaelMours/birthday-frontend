/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../security/auth/AuthContext";
import "./Signin.css";

function Signin() {
	const auth = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const isAuthenticated = await auth.login({ email: username, password });

		if (isAuthenticated) {
			navigate("/");
		} else {
			setError("Authentication failed. Please check your credentials.");
		}
	};

	return (
		<div className='signin-container'>
			<form
				className='signin-form'
				onSubmit={handleSubmit}
			>
				<h2>Sign In</h2>
				{error && <p className='error-message'>{error}</p>}
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>Sign In</button>
				<a
					href='/signup'
					className='signup-link'
				>
					Not registered yet? Sign up
				</a>
			</form>
		</div>
	);
}

export default Signin;
