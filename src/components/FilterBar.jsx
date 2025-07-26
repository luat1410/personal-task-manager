// src/components/FilterBar.jsx
import React, { useState, useEffect } from "react";
import { Input, Select, DatePicker, Row, Col } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const FilterBar = ({ tasks, setFilteredTasks }) => {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    let filtered = tasks;

    if (keyword) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(keyword.toLowerCase()) ||
          t.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (status) {
      filtered = filtered.filter((t) => t.status === status);
    }

    if (date) {
      filtered = filtered.filter(
        (t) => t.dueDate === dayjs(date).format("YYYY-MM-DD")
      );
    }

    setFilteredTasks(filtered);
  }, [keyword, status, date, tasks, setFilteredTasks]);

  return (
    <Row gutter={12}>
      <Col xs={24} sm={8}>
        <Input
          placeholder="Tìm theo từ khoá..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Col>
      <Col xs={24} sm={8}>
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Lọc theo trạng thái"
          value={status || undefined}
          onChange={(val) => setStatus(val)}
        >
          <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
          <Option value="Đang làm">Đang làm</Option>
          <Option value="Đã hoàn thành">Đã hoàn thành</Option>
        </Select>
      </Col>
      <Col xs={24} sm={8}>
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Lọc theo ngày hết hạn"
          value={date}
          onChange={(val) => setDate(val)}
        />
      </Col>
    </Row>
  );
};

export default FilterBar;
