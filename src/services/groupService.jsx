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
