/** @format */

import React, { useEffect, useState } from "react";
import {
	getGroupMembers,
	contributeToBirthdayMember,
} from "../../services/groupService";
import "./GroupMembers.css";
import Header from "../header/Header";
import ContributionForm from "../contribution/ContributionForm"; // Import the ContributionForm component

const formatDate = (dateString) => {
	const options = { day: "2-digit", month: "long", year: "numeric" };
	return new Date(dateString).toLocaleDateString("en-US", options);
};

const GroupMembers = () => {
	const [groupMembers, setGroupMembers] = useState([]);
	const [currentGroupId, setCurrentGroupId] = useState(null);

	useEffect(() => {
		const fetchGroupMembers = async () => {
			try {
				const members = await getGroupMembers();
				setGroupMembers(members);
			} catch (error) {
				console.error("Error fetching group members:", error);
			}
		};

		fetchGroupMembers();
	}, []);

	const handleContributeClick = (groupId) => {
		setCurrentGroupId(groupId);
	};

	// Get the current month
	const currentMonth = new Date().getMonth() + 1;

	return (
		<>
			<Header />
			<div className='container'>
				<h1 className='heading'>Group Members</h1>
				{groupMembers.map((group, index) => (
					<div
						key={index}
						className='group-container'
					>
						<h2 className='group-name'>{group.groupName}</h2>
						<p className='group-owner'>Group Owner: {group.groupOwnerName}</p>
						<table className='member-table'>
							<thead>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Birth Date</th>
									<th>Action</th> {/* Add this column for the button */}
								</tr>
							</thead>
							<tbody>
								{group.members.map((member, index) => (
									<tr key={index}>
										<td>{member.firstName}</td>
										<td>{member.lastName}</td>
										<td>{formatDate(member.birthDate)}</td>
										{/* Check if birthday month matches current month */}
										{new Date(member.birthDate).getMonth() + 1 ===
											currentMonth && (
											<td>
												<button
													onClick={() => handleContributeClick(group.groupId)}
												>
													Contribute to Birthday Member
												</button>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
						<p className='join-date'>Join Date: {formatDate(group.joinDate)}</p>
					</div>
				))}
			</div>
			{currentGroupId && (
				<ContributionForm
					groupId={currentGroupId}
					onClose={() => setCurrentGroupId(null)}
				/>
			)}
		</>
	);
};

export default GroupMembers;
