import { useAuth } from "@clerk/clerk-react";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { useEffect } from "react";

const useApiClient = () => {
	const { getToken } = useAuth();

	const api = axios.create({
		baseURL: "http://localhost:3000",
		headers: {
			"Content-Type": "application/json",
		},
	});

	useEffect(() => {
		const setAuthorizationHeader = async (
			config: InternalAxiosRequestConfig,
		) => {
			const token = await getToken();
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		};

		const requestInterceptor = api.interceptors.request.use(
			setAuthorizationHeader,
			(error) => Promise.reject(error),
		);

		return () => {
			api.interceptors.request.eject(requestInterceptor);
		};
	}, [getToken, api.interceptors.request.eject, api.interceptors.request.use]);

	return api;
};

export default useApiClient;
