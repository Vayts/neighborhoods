import axios from './axios';

export async function postRequest(uri: string, data: Record<string, any>, axiosInstance = axios): Promise<Record<string, any>> {
	const response = await axiosInstance.post(uri, data);
	return response;
}

export async function getRequest(uri: string, axiosInstance = axios): Promise<Record<string, any>> {
	const response = await axiosInstance.get(uri);
	return response;
}

export async function deleteRequest(uri: string, axiosInstance = axios): Promise<Record<string, any>> {
	const response = await axiosInstance.delete(uri);
	return response;
}
