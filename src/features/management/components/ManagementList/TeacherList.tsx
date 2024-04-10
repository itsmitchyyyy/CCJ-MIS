import { Space, TableProps } from 'antd';
import {
  GlobalStyle,
  StyledTable,
  TeacherListContainer,
  TeacherListHeader,
  TeacherListWrapper,
} from './elements';
import { useState } from 'react';
import { FetchTeachersResponseDTO } from '@/core/domain/dto/user.dto';

type Props = {
  isLoading?: boolean;
  teachers: FetchTeachersResponseDTO[];
  onDelete: (teacherId: string) => void;
  isDeleting?: boolean;
};

export const TeacherList = ({
  isLoading,
  teachers,
  isDeleting,
  onDelete,
}: Props) => {
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
          <a onClick={() => onDelete(record.id)}>Delete</a>
          <a onClick={() => onClickMarkAttendance(record)}>Mark Attendance</a>
        </Space>
      ),
    },
  ];

  const onClickMarkAttendance = (teacher: FetchTeachersResponseDTO) => {
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
          <StyledTable
            rowKey="id"
            columns={TableColumnData}
            dataSource={teachers}
            loading={isLoading || isDeleting}
          />
        </TeacherListContainer>
      </TeacherListWrapper>
    </>
  );
};
