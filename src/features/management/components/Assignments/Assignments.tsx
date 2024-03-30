import { Form, Input, List, Typography, Upload, message } from 'antd';
import { Assignment, AssignmentRequest, StudentAssignment } from '../../types';
import {
  AssignmentsDateContainer,
  AssignmentsWrapper,
  AssignmentstHeader,
  CreateAssignmentsButton,
  ErrorWrapper,
  StyledDatePicker,
  StyledTextArea,
  Wrapper,
} from './elements';
import { useGlobalState } from '@/hooks/global';
import { AccessType } from '@/features/account/types';
import { Modal } from '@/components/Elements/Modal';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  studentAssignmentValidationSchema,
  validationSchema,
} from './validation';
import { ErrorMessage } from '@hookform/error-message';
import {
  AssignmentRequestDTO,
  StudentAssignmentRequestDTO,
} from '@/core/domain/dto/assignment.dto';
import { useNavigate, useParams } from 'react-router-dom';
import { RcFile, UploadFile } from 'antd/es/upload';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type Props = {
  onCreateAssignment: (data: AssignmentRequestDTO) => void;
  onCreateStudentAssignment: (data: StudentAssignmentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  isFetching?: boolean;
  assignments: Assignment[];
  studentAssignment: StudentAssignment | null;
};

export const Assignments = ({
  onCreateAssignment,
  onCreateStudentAssignment,
  isLoading,
  isFetching,
  isSuccessful,
  assignments,
  studentAssignment,
}: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    useAuth: { accessType, id: userId },
  } = useGlobalState();

  const [openCreateAssignmentModal, setOpenCreateAssignmentModal] =
    useState<boolean>(false);
  const [openStartAssignmentModal, setOpenStartAssignmentModal] =
    useState<boolean>(false);
  const [documentFiles, setDocumentFiles] = useState<UploadFile[]>([]);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      due_date: new Date(),
      title: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    control: studentAssignmentControl,
    handleSubmit: handleSubmitStudentAssignment,
    formState: { errors: studentAssignmentErrors },
  } = useForm({
    defaultValues: {
      comments: '',
    },
    resolver: yupResolver(studentAssignmentValidationSchema),
  });

  const studentHasAssignment = !!studentAssignment;

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const onHandleSubmit = (data: AssignmentRequest) => {
    onCreateAssignment({
      ...data,
      due_date: new Date(dayjs(data.due_date).format('YYYY-MM-DD')),
      subject_id: id || '',
    });
  };

  const onHandleSubmitStudentAssignment = (data: { comments?: string }) => {
    if (documentFiles.length === 0) {
      messageApi.error('Please select a file to upload');
      return;
    }

    onCreateStudentAssignment({
      ...data,
      file_paths: documentFiles,
      assignment_id: selectedAssignment?.id || '',
      user_id: userId,
    });
  };

  const handleBeforeUploadFile = (_: RcFile, fileList: RcFile[]) => {
    setDocumentFiles([...documentFiles, ...fileList]);
    return false;
  };

  const handleOnRemoveFile = (file: UploadFile) => {
    const index = documentFiles.indexOf(file);
    const newDocumentFiles = documentFiles.slice();
    newDocumentFiles.splice(index, 1);
    setDocumentFiles(newDocumentFiles);
  };

  useEffect(() => {
    if (isSuccessful) {
      setOpenCreateAssignmentModal(false);
      setOpenStartAssignmentModal(false);
    }
  }, [isSuccessful]);

  return (
    <AssignmentsWrapper>
      {contextHolder}
      <AssignmentstHeader>
        <h1>Assignments</h1>
        {accessType !== AccessType.Student && (
          <CreateAssignmentsButton
            onClick={() => setOpenCreateAssignmentModal(true)}
            type="primary">
            Add Assignment
          </CreateAssignmentsButton>
        )}
      </AssignmentstHeader>
      <Wrapper>
        <List
          itemLayout="vertical"
          loading={isFetching}
          dataSource={assignments}
          renderItem={(item: Assignment, index) => (
            <List.Item
              actions={
                accessType === AccessType.Student
                  ? [
                      studentHasAssignment ? (
                        <small>Already submitted</small>
                      ) : (
                        <a
                          onClick={() => {
                            setSelectedAssignment(item);
                            setOpenStartAssignmentModal(true);
                          }}>
                          Start Assignment{' '}
                        </a>
                      ),
                    ]
                  : [
                      <a
                        onClick={() =>
                          navigate(
                            `/management/subject/${id}/assignments/${item.id}/submissions`,
                          )
                        }>
                        Submissions
                      </a>,
                    ]
              }
              key={index}
              extra={
                accessType === AccessType.Student ? (
                  <strong>Score: 0</strong>
                ) : null
              }>
              <List.Item.Meta
                style={{ whiteSpace: 'pre' }}
                title={<a>{item.title}</a>}
                description={
                  <p>Due on {dayjs(item.due_date).format('MMMM DD, YYYY')}</p>
                }
              />
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            </List.Item>
          )}
        />
      </Wrapper>

      <Modal
        open={openStartAssignmentModal}
        onCancel={() => setOpenStartAssignmentModal(false)}
        onSubmit={handleSubmitStudentAssignment(
          onHandleSubmitStudentAssignment,
        )}
        isLoading={isLoading}
        title="Assigment Form">
        <Form layout="vertical">
          <Typography.Text>Upload a file</Typography.Text>
          <Dragger
            multiple
            beforeUpload={handleBeforeUploadFile}
            onRemove={handleOnRemoveFile}
            fileList={documentFiles}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              banned files.
            </p>
          </Dragger>

          <Controller
            control={studentAssignmentControl}
            name="comments"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Comments">
                <StyledTextArea
                  value={value}
                  onChange={onChange}
                  rows={5}
                  status={studentAssignmentErrors.comments && 'error'}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>

      <Modal
        open={openCreateAssignmentModal}
        onSubmit={handleSubmit(onHandleSubmit)}
        isLoading={isLoading}
        onCancel={() => setOpenCreateAssignmentModal(false)}
        title="Create Assignment">
        <Form layout="vertical">
          <ErrorMessage
            name="title"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Title">
                <Input
                  value={value}
                  onChange={onChange}
                  size="large"
                  status={errors.title && 'error'}
                />
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="due_date"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="due_date"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Due Date">
                <AssignmentsDateContainer>
                  <StyledDatePicker
                    value={dayjs(value)}
                    onChange={(date: unknown, _: string | string[]) =>
                      onChange(date)
                    }
                    size="large"
                    disabledDate={disabledDate}
                  />
                </AssignmentsDateContainer>
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="description"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <Form.Item label="Description">
                <StyledTextArea
                  value={value}
                  onChange={onChange}
                  rows={10}
                  size="large"
                  status={errors.description && 'error'}
                />
              </Form.Item>
            )}
          />
        </Form>
      </Modal>
    </AssignmentsWrapper>
  );
};
