/** @format */

// src/components/group/GroupList.js
import { useState, useEffect } from "react";
import {
	getGroups,
	getJoinedGroups,
	joinGroup,
} from "../../services/groupService";
import "./GroupList.css";
import Header from "../header/Header";
import AddGroupModal from "../modals/AddGroupModal";

const GroupList = () => {
	const [groups, setGroups] = useState([]);
	const [joinedGroups, setJoinedGroups] = useState([]);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const [groupData, joinedGroupData] = await Promise.all([
					getGroups(),
					getJoinedGroups(),
				]);
				setGroups(groupData);
				setJoinedGroups(joinedGroupData.map((group) => group.groupId)); // Assuming groupId is unique
			} catch (error) {
				setError("Failed to fetch groups");
			}
		};

		fetchGroups();
	}, []);

	const handleJoinGroup = async (groupId) => {
		try {
			await joinGroup(groupId);
			setJoinedGroups([...joinedGroups, groupId]); // Update the joined groups list
		} catch (error) {
			console.error("Error joining group:", error);
			// Handle error
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className='group-list-container'>
			<Header />
			<h1>Birthday Groups</h1>
			<button
				className='add-group-button'
				onClick={() => setShowModal(true)}
			>
				Add Group
			</button>
			<div className='group-list'>
				{groups.map((group) => (
					<div
						key={group.groupId}
						className='group-item'
					>
						<h2>{group.groupName}</h2>
						<p>Owner: {group.groupOwnerName}</p>
						<p>Contribution Amount: R{group.contributorAmount}</p>
						{joinedGroups.includes(group.groupId) ? (
							<button
								className='joined-button'
								disabled
							>
								Joined
							</button>
						) : (
							<button
								className='join-group-button'
								onClick={() => handleJoinGroup(group.groupId)}
							>
								Join Group
							</button>
						)}
					</div>
				))}
			</div>
			{showModal && <AddGroupModal onClose={() => setShowModal(false)} />}
		</div>
	);
};

export default GroupList;
