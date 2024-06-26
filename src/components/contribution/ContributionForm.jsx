/** @format */

// src/components/group/ContributionForm.js
import  { useState, useEffect } from "react";
import { contributeToBirthdayMember } from "../../services/groupService";
import "./ContributionForm.css";

const ContributionForm = ({ groupId, onClose }) => {
	const [message, setMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await contributeToBirthdayMember(groupId);
			setMessage("Contribution successful.");
			setTimeout(() => {
				setMessage("");
				onClose();
			}, 2000); // Close the form after 2 seconds
		} catch (error) {
			console.error("Error contributing to birthday member:", error);
			setMessage("Failed to contribute.");
		}
	};

	return (
		<div className='contribution-form-container'>
			<form onSubmit={handleSubmit}>
				<h2>Contribute to Birthday Member</h2>
				<button type='submit'>Contribute</button>
				{message && <p>{message}</p>}
			</form>
		</div>
	);
};

export default ContributionForm;
