/** @format */

// src/services/groupService.js

import axios from "axios";

const API_URL = "http://localhost:8088/api/v1";

export const getGroups = async () => {
	try {
		const response = await axios.get(`${API_URL}/birthday-group/groups`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching groups:", error);
		throw error;
	}
};

export const getJoinedGroups = async () => {
	try {
		const response = await axios.get(
			`${API_URL}/birthday-group/joined-groups`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching joined groups:", error);
		throw error;
	}
};

export const joinGroup = async (groupId) => {
	try {
		const response = await axios.post(
			`${API_URL}/member/join/${groupId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error joining group:", error);
		throw error;
	}
};

export const getGroupMembers = async () => {
	try {
		const response = await axios.get(`${API_URL}/member/my-groups/members`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching group members:", error);
		throw error;
	}
};

export const getJoinRequestsForOwner = async () => {
	try {
		const response = await axios.get(`${API_URL}/member/owner/join-requests`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching join requests:", error);
		throw error;
	}
};

export const approveJoinRequest = async (requestId) => {
	try {
		const response = await axios.post(
			`${API_URL}/member/requests/${requestId}/approve`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error approving request:", error);
		throw error;
	}
};

export const rejectJoinRequest = async (requestId) => {
	try {
		const response = await axios.post(
			`${API_URL}/member/requests/${requestId}/reject`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error rejecting request:", error);
		throw error;
	}
};
export const contributeToBirthdayMember = async (groupId) => {
	try {
		const response = await axios.post(
			`${API_URL}/contributions/contribute/${groupId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error rejecting request:", error);
		throw error;
	}
};

export default {
	getGroups,
	getJoinedGroups,
	joinGroup,
	getGroupMembers,
	getJoinRequestsForOwner,
	approveJoinRequest,
	rejectJoinRequest,
	contributeToBirthdayMember,
};
