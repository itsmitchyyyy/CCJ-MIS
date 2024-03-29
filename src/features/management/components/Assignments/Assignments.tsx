import { Form, Input, List } from 'antd';
import { Assignment, AssignmentRequest } from '../../types';
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
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { AssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useParams } from 'react-router-dom';

type Props = {
  onCreateAssignment: (data: AssignmentRequestDTO) => void;
  isLoading?: boolean;
  isSuccessful?: boolean;
  isFetching?: boolean;
  assignments: Assignment[];
};

export const Assignments = ({
  onCreateAssignment,
  isLoading,
  isFetching,
  isSuccessful,
  assignments,
}: Props) => {
  const { id } = useParams();

  const {
    useAuth: { accessType },
  } = useGlobalState();

  const [openCreateAssignmentModal, setOpenCreateAssignmentModal] =
    useState<boolean>(false);

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

  useEffect(() => {
    if (isSuccessful) {
      setOpenCreateAssignmentModal(false);
    }
  }, [isSuccessful]);

  return (
    <AssignmentsWrapper>
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
            <List.Item actions={[<a>View</a>]} key={index}>
              <List.Item.Meta
                style={{ whiteSpace: 'pre' }}
                title={<a>{item.title}</a>}
                description={
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                }
              />
              <div>
                <p>Due on {dayjs(item.due_date).format('MMMM DD, YYYY')}</p>
              </div>
            </List.Item>
          )}
        />
      </Wrapper>

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
