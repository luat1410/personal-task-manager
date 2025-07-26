// src/components/Statistics.jsx
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import dayjs from 'dayjs';

const Statistics = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Đã hoàn thành').length;
  const overdue = tasks.filter(t => t.status !== 'Đã hoàn thành' && dayjs(t.dueDate).isBefore(dayjs(), 'day')).length;

  return (
    <Row gutter={16} style={{ margin: '24px 0' }}>
      <Col xs={24} sm={8}>
        <Card><Statistic title="Tổng công việc" value={total} /></Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card><Statistic title="Đã hoàn thành" value={completed} valueStyle={{ color: '#52c41a' }} /></Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card><Statistic title="Quá hạn" value={overdue} valueStyle={{ color: '#ff4d4f' }} /></Card>
      </Col>
    </Row>
  );
};

export default Statistics;
