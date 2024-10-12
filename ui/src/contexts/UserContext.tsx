import {
	createContext,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import useApiClient from "../axios";

interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

type UserContextType = {
	users: User[];
	loading: boolean;
	fetchUsers: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
	const api = useApiClient();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const fetchUsers = async () => {
		setLoading(true);
		try {
			const response = await api.get<User[]>("users");
			setUsers(response.data); 
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const contextValue = useMemo(
		() => ({
			users,
			loading,
			fetchUsers,
		}),
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		[users, loading, fetchUsers],
	);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
