import { Form, Select, Space, TableProps } from 'antd';
import {
  GlobalStyle,
  StyledDatePicker,
  StyledTable,
  TeacherListContainer,
  TeacherListHeader,
  TeacherListWrapper,
  TeacherSelectContainer,
} from './elements';
import { useState } from 'react';
import { FetchTeachersResponseDTO } from '@/core/domain/dto/user.dto';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { Modal } from '@/components/Elements/Modal';
import { Controller, useForm } from 'react-hook-form';
import { AttendanceOptions } from '@/constants/data';
import dayjs from 'dayjs';
import { AttendanceStatus } from '@/core/domain/dto/attendance.dto';
import { RangePickerProps } from 'antd/es/date-picker';

type Props = {
  isLoading?: boolean;
  teachers: FetchTeachersResponseDTO[];
  isSubmitting?: boolean;
};

export const TeacherList = ({ isLoading, teachers, isSubmitting }: Props) => {
  const navigate = useNavigate();
  const [openAttendanceModal, setOpenAttendanceModal] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] =
    useState<FetchTeachersResponseDTO | null>(null);

  const TableColumnData: TableProps<FetchTeachersResponseDTO>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'student',
      key: 'first_name',
      render: (_, record) => record.first_name,
    },
    {
      title: 'Last Name',
      dataIndex: 'student',
      key: 'last_name',
      render: (_, record) => record.last_name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(
                PATHS.MANAGEMENT.TEACHER_SUBJECTS.replace(':id', record.id),
              )
            }>
            Subjects
          </a>
          <a onClick={() => onClickMarkAttendance(record)}>Mark Attendance</a>
        </Space>
      ),
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  const { handleSubmit: onHandleSubmitAttendance, control } = useForm({
    defaultValues: {
      date: new Date(),
      status: AttendanceOptions[0].value as AttendanceStatus,
    },
  });

  const onClickMarkAttendance = (teacher: FetchTeachersResponseDTO) => {
    setSelectedTeacher(teacher);
    setOpenAttendanceModal(true);
  };

  const onSubmitAttendance = (data: {
    date: Date;
    status: AttendanceStatus;
  }) => {
    const newData = {
      ...data,
      user_id: selectedTeacher?.id || '',
    };
  };

  return (
    <>
      <GlobalStyle />
      <TeacherListWrapper>
        <TeacherListHeader>
          <h1>Teachers</h1>
        </TeacherListHeader>

        <TeacherListContainer>
          <StyledTable
            rowKey="id"
            columns={TableColumnData}
            dataSource={teachers}
            loading={isLoading}
          />
        </TeacherListContainer>

        <Modal
          isLoading={isSubmitting}
          open={openAttendanceModal}
          onCancel={() => {
            setSelectedTeacher(null);
            setOpenAttendanceModal(false);
          }}
          title="Mark Attendance"
          onSubmit={onHandleSubmitAttendance(onSubmitAttendance)}>
          <Form layout="vertical">
            <Controller
              name="date"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Attendance Date">
                  <TeacherSelectContainer>
                    <StyledDatePicker
                      format="YYYY-MM-DD"
                      value={dayjs(value)}
                      onChange={(date: unknown, _: string | string[]) =>
                        onChange(date)
                      }
                      disabledDate={disabledDate}
                      size="large"
                    />
                  </TeacherSelectContainer>
                </Form.Item>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.Item label="Status">
                  <Select
                    size="large"
                    onChange={onChange}
                    value={value}
                    options={AttendanceOptions}
                  />
                </Form.Item>
              )}
            />
          </Form>
        </Modal>
      </TeacherListWrapper>
    </>
  );
};
