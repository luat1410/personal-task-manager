// src/components/TaskList.jsx
import React from "react";
import { Card, Tag, Space, Empty, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const statusColor = {
  "Chưa bắt đầu": "default",
  "Đang làm": "processing",
  "Đã hoàn thành": "success",
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <Empty description="Không có công việc" style={{ marginTop: 40 }} />;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="middle">
      {tasks.map((task) => (
        <Card
          key={task.id}
          title={task.title}
          extra={<Tag color={statusColor[task.status]}>{task.status}</Tag>}
          actions={[
            <EditOutlined key="edit" onClick={() => onEdit(task)} />,
            <Popconfirm
              title="Bạn có chắc muốn xoá công việc này?"
              onConfirm={() => onDelete(task.id)}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <DeleteOutlined key="delete" style={{ color: "red" }} />
            </Popconfirm>,
          ]}
        >
          <p>
            <strong>Mô tả:</strong> {task.description}
          </p>
          <p>
            <strong>Hạn:</strong> {task.dueDate}
          </p>
        </Card>
      ))}
    </Space>
  );
};

export default TaskList;
