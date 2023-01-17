import axios from 'axios';

export const BASE_URL = 'http://localhost:8020';

export default axios.create({
	baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
