// src/components/TaskForm.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, message } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const TaskForm = ({ task, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: dayjs(task.dueDate)
      });
    } else {
      form.resetFields();
    }
  }, [task, form]);

  const handleFinish = (values) => {
    if (!values.title || !values.dueDate || !values.status) {
      message.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newTask = {
      ...task,
      ...values,
      dueDate: values.dueDate.format('YYYY-MM-DD'),
    };

    onSave(newTask);
    message.success(task ? 'Đã cập nhật công việc!' : 'Đã thêm công việc!');
    form.resetFields();
  };

  return (
    <Modal
      title={task ? 'Chỉnh sửa Công việc' : 'Thêm Công việc'}
      open={true}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Lưu"
      cancelText="Huỷ"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Nhập tiêu đề' }]}> 
          <Input placeholder="Nhập tiêu đề công việc" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3} placeholder="Mô tả chi tiết" />
        </Form.Item>

        <Form.Item label="Hạn hoàn thành" name="dueDate" rules={[{ required: true, message: 'Chọn hạn' }]}> 
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Chọn trạng thái' }]}> 
          <Select placeholder="Chọn trạng thái">
            <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
            <Option value="Đang làm">Đang làm</Option>
            <Option value="Đã hoàn thành">Đã hoàn thành</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
