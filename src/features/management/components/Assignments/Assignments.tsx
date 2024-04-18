import { Form, Input, List, Typography, Upload, message } from 'antd';
import {
  Assignment,
  AssignmentRequest,
  AssignmentWithStudentAssignments,
  StudentAssignments,
} from '../../types';
import {
  AssignmentsDateContainer,
  AssignmentsWrapper,
  AssignmentstHeader,
  CreateAssignmentsButton,
  ErrorWrapper,
  StyledDatePicker,
  StyledTextArea,
  StyledTimePicker,
  TimePickerContainerFormItem,
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
import { formatStringDate } from '@/utils/format';
import moment from 'moment';

const { Dragger } = Upload;

type Props = {
  onCreateAssignment: (data: AssignmentRequestDTO) => void;
  onCreateStudentAssignment: (data: StudentAssignmentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  isFetching?: boolean;
  assignments: (Assignment & { student_assignments?: StudentAssignments[] })[];
};

export const Assignments = ({
  onCreateAssignment,
  onCreateStudentAssignment,
  isLoading,
  isFetching,
  isSuccessful,
  assignments,
}: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    useAuth: { accessType, id: userId },
  } = useGlobalState();

  const [selectedDueDate, setSelectedDueDate] = useState(dayjs().toDate());
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
    reset,
  } = useForm({
    defaultValues: {
      due_date: new Date(),
      due_time: dayjs().hour(dayjs().hour()).minute(30).toDate(),
      title: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    control: studentAssignmentControl,
    handleSubmit: handleSubmitStudentAssignment,
    formState: { errors: studentAssignmentErrors },
    reset: resetAssignmentForm,
  } = useForm({
    defaultValues: {
      comments: '',
    },
    resolver: yupResolver(studentAssignmentValidationSchema),
  });

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const disabledHours = () => {
    const hours = [];
    const currentHour = dayjs().hour();

    if (selectedDueDate.getDate() === dayjs().date()) {
      for (let i = 0; i < currentHour; i++) {
        hours.push(i);
      }
    }

    return hours;
  };

  const disabledMinutes = (selectedHour: number) => {
    const minutes = [];
    const currentMinute = dayjs().minute();

    if (
      selectedDueDate.getDate() === dayjs().date() &&
      selectedHour === dayjs().hour()
    ) {
      for (let i = 0; i < currentMinute; i++) {
        minutes.push(i);
      }
    }

    return minutes;
  };

  const onHandleSubmit = (data: AssignmentRequest) => {
    onCreateAssignment({
      ...data,
      due_date: new Date(dayjs(data.due_date).format('YYYY-MM-DD')),
      subject_id: id || '',
    });
  };

  const onHandleSubmitStudentAssignment = (data: { comments?: string }) => {
    if (
      moment(
        `${selectedAssignment?.due_date} ${selectedAssignment?.due_time}`,
      ).isBefore(moment())
    ) {
      messageApi.error('Assignment is closed');
      return;
    }

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
      resetAssignmentForm();
      reset();
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
          renderItem={(item: AssignmentWithStudentAssignments, index) => (
            <List.Item
              actions={
                accessType === AccessType.Student
                  ? [
                      item.student_assignments?.some(
                        (student_assignment) =>
                          student_assignment.assignment_id === item.id,
                      ) ? (
                        <small>Already submitted</small>
                      ) : moment(`${item.due_date} ${item.due_time}`).isBefore(
                          moment(),
                        ) ? (
                        <span>Assignment is closed</span>
                      ) : (
                        <a
                          onClick={() => {
                            setSelectedAssignment(item);
                            setOpenStartAssignmentModal(true);
                          }}>
                          Start Assignment
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
                  <strong>
                    Score:
                    {item.student_assignments?.filter(
                      (student_assignment) =>
                        student_assignment.assignment_id === item.id,
                    )[0]?.score || 0}
                  </strong>
                ) : null
              }>
              <List.Item.Meta
                style={{ whiteSpace: 'pre' }}
                title={<a>{item.title}</a>}
                description={
                  <p>
                    Due on {dayjs(item.due_date).format('MMMM DD, YYYY')}{' '}
                    {formatStringDate(item.due_time, 'hh:mm A')}
                  </p>
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
                    onChange={(date: unknown, _: string | string[]) => {
                      onChange(date);
                      setSelectedDueDate(dayjs(date as Date).toDate());
                    }}
                    size="large"
                    disabledDate={disabledDate}
                  />
                </AssignmentsDateContainer>
              </Form.Item>
            )}
          />

          <ErrorMessage
            name="due_time"
            errors={errors}
            render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
          />
          <Controller
            control={control}
            name="due_time"
            render={({ field: { value, onChange } }) => {
              return (
                <TimePickerContainerFormItem label="Due Time">
                  <StyledTimePicker
                    value={dayjs(value)}
                    onChange={(date: unknown, _: string | string[]) =>
                      onChange(date)
                    }
                    size="large"
                    use12Hours
                    format="h:mm a"
                    needConfirm={false}
                    minuteStep={30}
                    disabledTime={() => ({
                      disabledHours: disabledHours,
                      disabledMinutes: (hour) => disabledMinutes(hour),
                    })}
                  />
                </TimePickerContainerFormItem>
              );
            }}
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
