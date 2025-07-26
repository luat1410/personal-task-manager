import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Button, Row, Col, message } from "antd";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Statistics from "../components/Statistics";
import FilterBar from "../components/FilterBar";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import "./Dashboard.scss";

const { Header, Content } = Layout;
const { Title } = Typography;

const fakeTasks = [
  {
    id: 1,
    title: "Làm báo cáo tuần",
    description: "Chuẩn bị báo cáo cho team",
    dueDate: "2025-07-25",
    status: "Chưa bắt đầu",
  },
  {
    id: 2,
    title: "Fix lỗi hiển thị giao diện",
    description: "Sửa lỗi layout trang dashboard",
    dueDate: "2025-07-22",
    status: "Đang làm",
  },
  {
    id: 3,
    title: "Nộp bài kiểm tra frontend",
    description: "Nộp bài lên GitHub và Vercel",
    dueDate: "2025-07-20",
    status: "Đã hoàn thành",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (!savedTasks || savedTasks.length === 0) {
      localStorage.setItem("tasks", JSON.stringify(fakeTasks));
      savedTasks = fakeTasks;
    }
    setTasks(savedTasks);
    setFilteredTasks(savedTasks);
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    setFilteredTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    saveTasks(updated);
    message.success("Đã xoá công việc");
  };

  const handleSave = (task) => {
    let updated;
    if (editingTask) {
      updated = tasks.map((t) => (t.id === task.id ? task : t));
    } else {
      updated = [...tasks, { ...task, id: Date.now() }];
    }
    saveTasks(updated);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <Layout>
      <Header className="dashboard-header">
        <Row style={{ width: "100%" }}>
          <Col flex="auto">
            <Title level={3} className="dashboard-title">
              Quản lý Công việc
            </Title>
          </Col>
          <Col>
            <Button
              type="text"
              icon={<LogoutOutlined style={{ fontSize: 20 }} />}
              onClick={handleLogout}
            />
          </Col>
        </Row>
      </Header>
      <Content className="dashboard-content">
        <Row gutter={[16, 16]} align="middle" className="dashboard-filters">
          <Col xs={24} md={18}>
            <FilterBar tasks={tasks} setFilteredTasks={setFilteredTasks} />
          </Col>
          <Col xs={24} md={6} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
              style={{ width: "100%", maxWidth: "180px" }}
            >
              Thêm Công Việc
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Statistics tasks={tasks} />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>

        {showForm && (
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Dashboard;
