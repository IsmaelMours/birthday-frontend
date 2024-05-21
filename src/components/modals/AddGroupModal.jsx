/** @format */

// src/components/modals/AddGroupModal.js
import { useState } from "react";
import "./AddGroupModal.css"; // Import the CSS file for modal styling

const AddGroupModal = ({ onClose }) => {
	const [groupName, setGroupName] = useState("");
	const [contributionAmount, setContributionAmount] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requestData = {
			groupName,
			contributionAmount,
		};

		try {
			const token = localStorage.getItem("token"); // Retrieve the token from local storage
			const response = await fetch(
				"http://localhost:8088/api/v1/birthday-group/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // Add the Authorization header
					},
					body: JSON.stringify(requestData),
				}
			);

			if (response.ok) {
				alert("Group created successfully!");
				onClose();
			} else {
				alert("Failed to create group");
			}
		} catch (error) {
			alert("Error creating group");
		}
	};

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<button
					className='close-button'
					onClick={onClose}
				>
					&times;
				</button>
				<h2>Add Group</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Group Name:
						<input
							type='text'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							required
						/>
					</label>
					<label>
						Contribution Amount:
						<input
							type='number'
							value={contributionAmount}
							onChange={(e) => setContributionAmount(e.target.value)}
							required
						/>
					</label>
					<div className='modal-actions'>
						<button type='submit'>Create Group</button>
						<button
							type='button'
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddGroupModal;
