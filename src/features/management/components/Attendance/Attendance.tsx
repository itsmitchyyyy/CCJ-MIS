import { FetchStudentSubjectResponseDTO } from '@/core/domain/dto/subject.dto';
import {
  AttendanceListContainer,
  AttendanceListHeader,
  AttendanceListWrapper,
  StyledTable,
} from './elements';
import { Space, TableProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  isLoading?: boolean;
  students: FetchStudentSubjectResponseDTO[];
};

export const Attendance = ({ isLoading, students }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const TableColumnData: TableProps<FetchStudentSubjectResponseDTO>['columns'] =
    [
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
            <a
              onClick={() =>
                navigate(
                  `/management/subject/${id}/attendance/${record.student_id}`,
                )
              }>
              Attendance Records
            </a>
          </Space>
        ),
      },
    ];

  return (
    <>
      <AttendanceListWrapper>
        <AttendanceListHeader>
          <h1>Student List</h1>
        </AttendanceListHeader>
        <AttendanceListContainer>
          <StyledTable
            loading={isLoading}
            columns={TableColumnData}
            dataSource={students}
            rowKey="id"
          />
        </AttendanceListContainer>
      </AttendanceListWrapper>
    </>
  );
};
