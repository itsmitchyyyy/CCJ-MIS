import { Form, Input, List } from 'antd';
import { Assignment } from '../../types';
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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { AssignmentRequestDTO } from '@/core/domain/dto/assignment.dto';
import { useParams } from 'react-router-dom';

const data: Assignment[] = [
  {
    title: 'Ant Design Title 1',
    due_date: new Date(),
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team',
  },
  {
    title: 'Ant Design Title 2',
    due_date: new Date(),
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team',
  },
  {
    title: 'Ant Design Title 3',
    due_date: new Date(),
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team',
  },
  {
    title: 'Ant Design Title 4',
    due_date: new Date(),
    description:
      'Ant Design, a design language for \nbackground applications, is refined by Ant UED Team',
  },
];

type Props = {
  onCreateAssignment: (data: AssignmentRequestDTO) => void;
  isLoading?: boolean;
};

export const Assignments = ({ onCreateAssignment, isLoading }: Props) => {
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

  const onHandleSubmit = (data: Assignment) => {
    onCreateAssignment({
      ...data,
      due_date: new Date(dayjs(data.due_date).format('YYYY-MM-DD')),
      subject_id: id || '',
    });
  };

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
          dataSource={data}
          renderItem={(item: Assignment, index) => (
            <List.Item actions={[<a>View</a>]} key={index}>
              <List.Item.Meta
                style={{ whiteSpace: 'pre' }}
                title={<a>{item.title}</a>}
                description={
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                }
              />
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
