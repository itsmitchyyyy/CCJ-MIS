import { Space, TableProps } from 'antd';
import { StudentAssignments } from '../../types';
import {
  AssignmentsWrapper,
  AssignmentstHeader,
  StyledTable,
  Wrapper,
} from './elements';
import { BACKEND_URL } from '@/config';

type Props = {
  isLoading?: boolean;
  studentAssignments?: StudentAssignments[];
};

export const Submissions = ({ isLoading, studentAssignments }: Props) => {
  const TableColumnData: TableProps<StudentAssignments>['columns'] = [
    {
      title: 'Student',
      key: 'user_id',
      render: (_, record) => (
        <span>{`${record.student.first_name} ${record.student.last_name}`}</span>
      ),
    },

    {
      title: 'Files',
      key: 'file_paths',
      render: (_, record) => (
        <Space size="small" direction="vertical">
          {record.file_paths.map((file, index) => {
            const fileName = file.split('/').pop();

            return (
              <a download href={`${BACKEND_URL}/${file}`} key={index}>
                {fileName}
              </a>
            );
          })}
        </Space>
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  return (
    <AssignmentsWrapper>
      <AssignmentstHeader>
        <h1>Student Submissions</h1>
      </AssignmentstHeader>
      <Wrapper>
        <StyledTable
          columns={TableColumnData}
          rowKey="id"
          loading={isLoading}
          dataSource={studentAssignments}
        />
      </Wrapper>
    </AssignmentsWrapper>
  );
};
