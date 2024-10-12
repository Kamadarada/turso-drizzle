import { useEffect } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	UserOutlined,
	DashboardOutlined,
	FileTextOutlined,
	TeamOutlined,
	SettingOutlined,
	LoginOutlined,
} from "@ant-design/icons";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";
import "./App.css";
import { useUser } from "./contexts/UserContext";

interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

function App() {
	const { users, fetchUsers, loading } = useUser();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchUsers();
	}, []);

	const columns: ColumnsType<User> = [
		{
			title: "Id",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Nome",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Criado em",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: "Ações",
			key: "actions",
			render: (_, record) => (
				<Space size="middle">
					<Button type="link" onClick={() => console.log("Editar usuário")}>
						Editar
					</Button>
					<Popconfirm
						title="Tem certeza que deseja deletar este usuário?"
						onConfirm={() => console.log("Deletar usuário")}
						okText="Sim"
						cancelText="Não"
					>
						<Button type="link" danger>
							Deletar
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div className="App">
			<aside className="sidebar">
				<div className="user-info">
					<UserOutlined style={{ fontSize: "4rem", color: "#fff" }} />
					<h2>John Doe</h2>
					<p>johndoe@example.com</p>
				</div>
				<nav className="nav-menu">
					<a href="#" className="nav-item">
						<DashboardOutlined /> Dashboard
					</a>
					<a href="#" className="nav-item">
						<FileTextOutlined /> Site Details
					</a>
					<a href="#" className="nav-item">
						<TeamOutlined /> Collaborators
					</a>
					<a href="#" className="nav-item">
						<SettingOutlined /> Settings
					</a>
				</nav>
				<div className="auth-section">
					<SignedOut>
						<SignInButton mode="modal">
							<Button type="link" className="nav-item">
								<LoginOutlined /> Sign in
							</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</aside>
			<main className="content">
				<header className="content-header">
					<h1>Usuários</h1>
					<Button
						type="primary"
						style={{ backgroundColor: "#1890ff" }}
						onClick={fetchUsers}
						loading={loading}
					>
						Atualizar Usuários
					</Button>
				</header>
				<div className="table-container">
					<Table<User>
						dataSource={users}
						columns={columns}
						rowKey="id"
						pagination={{ pageSize: 5 }}
						bordered
						loading={loading}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;
