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
import { Link } from "react-router-dom";

const GroupList = () => {
	const [groups, setGroups] = useState([]);
	const [joinRequests, setJoinRequests] = useState([]);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const [groupData, joinRequestData] = await Promise.all([
					getGroups(),
					getJoinedGroups(),
				]);
				setGroups(groupData);
				setJoinRequests(joinRequestData.map((group) => group.groupId));
			} catch (error) {
				setError("Failed to fetch groups");
			}
		};

		fetchGroups();
	}, []);

	const handleJoinGroup = async (groupId) => {
		try {
			await joinGroup(groupId);
			setJoinRequests([...joinRequests, groupId]);
		} catch (error) {
			if (error.response && error.response.status === 409) {
				alert("Each member must have a unique birth month.");
			} else {
				console.error("Error joining group:", error);
			}
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<Header/>
			<div className='group-list-container'>
				
				<h1>Birthday Groups</h1>
				<button
					className='add-group-button'
					onClick={() => setShowModal(true)}
				>
					Add Group
				</button>
				<Link
					to='/join-requests'
					className='join-requests-link'
				>
					View Join Requests
				</Link>
				<div className='group-list'>
					{groups.map((group) => (
						<div
							key={group.groupId}
							className='group-item'
						>
							<h2>{group.groupName}</h2>
							<p>Owner: {group.groupOwnerName}</p>
							<p>Contribution Amount: R{group.contributorAmount}</p>
							{joinRequests.includes(group.groupId) ? (
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
									Request to Join Group
								</button>
							)}
						</div>
					))}
				</div>
				{showModal && <AddGroupModal onClose={() => setShowModal(false)} />}
			</div>
		</>
	);
};

export default GroupList;
