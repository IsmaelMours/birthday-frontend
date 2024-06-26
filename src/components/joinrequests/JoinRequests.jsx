/** @format */

import { useState, useEffect } from "react";
import {
	getJoinRequestsForOwner,
	approveJoinRequest,
	rejectJoinRequest,
} from "../../services/groupService";
import "./JoinRequests.css";
import Header from "../header/Header";

const JoinRequests = () => {
	const [joinRequests, setJoinRequests] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchJoinRequests = async () => {
			try {
				const data = await getJoinRequestsForOwner();
				setJoinRequests(data);
			} catch (error) {
				setError("Failed to fetch join requests");
			}
		};

		fetchJoinRequests();
	}, []);

	const handleApprove = async (requestId) => {
		const confirmApprove = window.confirm(
			"Are you sure you want to approve this request?"
		);
		if (!confirmApprove) {
			return;
		}

		try {
			await approveJoinRequest(requestId);
			setJoinRequests(
				joinRequests.filter((request) => request.requestId !== requestId)
			);
		} catch (error) {
			console.error("Error approving join request:", error);
			setError("Failed to approve join request");
		}
	};

	const handleReject = async (requestId) => {
		const confirmReject = window.confirm(
			"Are you sure you want to reject this request?"
		);
		if (!confirmReject) {
			return;
		}

		try {
			await rejectJoinRequest(requestId);
			setJoinRequests(
				joinRequests.filter((request) => request.requestId !== requestId)
			);
		} catch (error) {
			console.error("Error rejecting join request:", error);
			setError("Failed to reject join request");
		}
	};

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<Header />
			<div className='join-requests-container'>
				<h1>Join Requests</h1>
				<div className='join-requests-list'>
					{joinRequests.map((request) => (
						<div
							key={request.requestId}
							className='join-request-item'
						>
							<p>
								<strong>Request from:</strong> {request.userName}
							</p>
							<p>
								<strong>Group:</strong> {request.groupName}
							</p>
							<p>
								<strong>Status:</strong> {request.approvalStatus}
							</p>
							<div className='button-group'>
								<button
									className='approve-button'
									onClick={() => handleApprove(request.requestId)}
								>
									Approve
								</button>
								<button
									className='reject-button'
									onClick={() => handleReject(request.requestId)}
								>
									Reject
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default JoinRequests;
