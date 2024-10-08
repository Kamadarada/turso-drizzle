import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	UserOutlined,
	DashboardOutlined,
	FileTextOutlined,
	TeamOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import "./App.css";

interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
}

function App() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		fetch("http://localhost:3000/users")
			.then((response) => response.json())
			.then((data) => setUsers(data))
			.catch((error) => console.error("Erro ao buscar usuários:", error));
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
					<Button type="link" onClick={() => console.log("Editado")}>
						Editar
					</Button>
					<Popconfirm
						title="Tem certeza que deseja deletar este usuário?"
						onConfirm={() => console.log("Deletado")}
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
			</aside>
			<main className="content">
				<header className="content-header">
					<h1>Usuários</h1>
					<Button type="primary" style={{ backgroundColor: "#1890ff" }}>
						+ Novo usuário
					</Button>
				</header>
				<div className="table-container">
					<Table
						dataSource={users}
						columns={columns}
						rowKey="id"
						pagination={{ pageSize: 5 }}
						bordered
					/>
				</div>
			</main>
		</div>
	);
}

export default App;

