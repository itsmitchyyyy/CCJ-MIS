import { Space, TableProps } from 'antd';
import {
  GlobalStyle,
  StyledTable,
  TeacherListContainer,
  TeacherListHeader,
  TeacherListWrapper,
} from './elements';
import { useState } from 'react';
import { User } from '@/core/domain/entities/user.entity';

type Props = {
  onDelete: (teacherId: string) => void;
};

export const TeacherList = ({ onDelete }: Props) => {
  const [openAttendanceModal, setOpenAttendanceModal] =
    useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<User | null>(null);

  const TableColumnData: TableProps<any>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'First Name',
      dataIndex: 'student',
      key: 'first_name',
      render: (record) => record.first_name,
    },
    {
      title: 'Last Name',
      dataIndex: 'student',
      key: 'last_name',
      render: (record) => record.last_name,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onDelete(record.id)}>Delete</a>
          <a onClick={() => onClickMarkAttendance(record.teacher)}>
            Mark Attendance
          </a>
        </Space>
      ),
    },
  ];

  const onClickMarkAttendance = (teacher: User) => {
    setSelectedTeacher(teacher);
    setOpenAttendanceModal(true);
  };

  return (
    <>
      <GlobalStyle />
      <TeacherListWrapper>
        <TeacherListHeader>
          <h1>Teachers</h1>
        </TeacherListHeader>

        <TeacherListContainer>
          <StyledTable rowKey="id" columns={TableColumnData} />
        </TeacherListContainer>
      </TeacherListWrapper>
    </>
  );
};
