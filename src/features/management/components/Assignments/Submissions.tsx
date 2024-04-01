import { Form, Space, TableProps } from 'antd';
import { StudentAssignments, UpdateStudentAssignment } from '../../types';
import {
  AssignmentsWrapper,
  AssignmentstHeader,
  ErrorWrapper,
  StyledInputNumber,
  StyledTable,
  StyledTextArea,
  Wrapper,
} from './elements';
import { BACKEND_URL } from '@/config';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateScoreValidationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { Modal } from '@/components/Elements/Modal';

type Props = {
  isLoading?: boolean;
  studentAssignments?: StudentAssignments[];
  onScoreUpdate: (params: {
    data: UpdateStudentAssignment;
    id: string;
  }) => void;
  isSubmitting?: boolean;
  isUpdateSuccess?: boolean;
};

export const Submissions = ({
  isLoading,
  studentAssignments,
  onScoreUpdate,
  isSubmitting,
  isUpdateSuccess,
}: Props) => {
  const [openScore, setOpenScore] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentAssignments | null>(null);

  const {
    control,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(updateScoreValidationSchema),
    defaultValues: {
      score: 0,
      remarks: '',
    },
  });

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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOpenScore(true);
              setSelectedStudent(record);
              setValue('score', record.score);
            }}>
            Update Score
          </a>
        </Space>
      ),
    },
  ];

  const onHandleScoreUpdate = (data: UpdateStudentAssignment) => {
    if (selectedStudent) {
      onScoreUpdate({ data, id: selectedStudent.id });
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setOpenScore(false);
      reset();
    }
  }, [isUpdateSuccess]);

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

      <Modal
        isLoading={isSubmitting}
        title="Update Score"
        open={openScore}
        onSubmit={handleSubmit(onHandleScoreUpdate)}
        onCancel={() => setOpenScore(false)}>
        <Form layout="vertical">
          <ErrorMessage
            name="score"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />

          <Controller
            control={control}
            name="score"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Score">
                <StyledInputNumber
                  value={value}
                  onChange={onChange}
                  max={100}
                  size="large"
                  status={errors.score && 'error'}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="remarks"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="remarks"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Remarks">
                <StyledTextArea
                  size="large"
                  value={value}
                  onChange={onChange}
                  rows={5}
                  status={errors.remarks && 'error'}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </AssignmentsWrapper>
  );
};
