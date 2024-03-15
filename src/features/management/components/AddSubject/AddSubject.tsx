import { Flex, Form, Input, Select } from 'antd';
import {
  AddSubjectContainer,
  ButtonWrapper,
  ClassContainer,
  ErrorWrapper,
  StyledButton,
  StyledFlex,
  StyledInputNumber,
  StyledTextArea,
  StyledTimePicker,
  TimePickerContainerFormItem,
  Wrapper,
} from './elements';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { ErrorMessage } from '@hookform/error-message';
import { useFetchTeachers } from '../../api/fetchTeachers';
import { AddSubjectRequest } from '@/core/domain/dto/subject.dto';
import { useEffect } from 'react';
import { useGlobalState } from '@/hooks/global';

const DefaultValues = {
  user_id: '',
  description: '',
  code: 'CCJ-01',
  name: '',
  units: 3,
  time_start: dayjs().hour(7).minute(0).toDate(),
  time_end: dayjs().hour(8).minute(0).toDate(),
};

type Props = {
  onSubmit: (data: AddSubjectRequest) => void;
  isPending: boolean;
  isSuccess?: boolean;
};

export const AddSubject = ({ onSubmit, isPending, isSuccess }: Props) => {
  const { data: teachers = [], isLoading } = useFetchTeachers();
  const {
    useSubject: { subjectError },
  } = useGlobalState();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: DefaultValues,
  });

  useEffect(() => {
    if (isSuccess) {
      reset(DefaultValues);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (subjectError.errors) {
      Object.keys(subjectError.errors).forEach((key: any) => {
        setError(key, { type: 'custom', message: subjectError.errors[key] });
      });
    }
  }, [subjectError]);

  return (
    <AddSubjectContainer>
      <h1>Add Subject</h1>
      <Wrapper>
        <Form layout="vertical">
          <Flex gap="large">
            <StyledFlex vertical>
              <ErrorMessage
                name="user_id"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Assigned Teacher" required>
                    <Select
                      loading={isLoading}
                      status={errors.user_id && 'error'}
                      size="large"
                      value={field.value}
                      options={teachers.map((teacher) => ({
                        label: `${teacher.first_name} ${teacher.last_name}`,
                        value: teacher.id,
                      }))}
                      onChange={field.onChange}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="code"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Subject Code" required>
                    <Input
                      name="code"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.code && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="description"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Description">
                    <StyledTextArea
                      rows={5}
                      name="description"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.description && 'error'}
                    />
                  </Form.Item>
                )}
              />
            </StyledFlex>
            <StyledFlex vertical>
              <ErrorMessage
                name="name"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Subject Name" required>
                    <Input
                      name="name"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.name && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="units"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="units"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Units" required>
                    <StyledInputNumber
                      min={3}
                      name="units"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.units && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <Flex gap="middle">
                <ClassContainer>
                  <Controller
                    name="time_start"
                    control={control}
                    render={({ field }) => (
                      <TimePickerContainerFormItem label="Class Start" required>
                        <StyledTimePicker
                          disabledTime={() => ({
                            disabledHours: () => [
                              0, 1, 2, 3, 4, 5, 6, 21, 22, 23,
                            ],
                          })}
                          hideDisabledOptions
                          status={errors.time_start && 'error'}
                          size="large"
                          value={dayjs(new Date(field.value))}
                          use12Hours
                          format="h:mm a"
                          onChange={field.onChange}
                          needConfirm={false}
                          minuteStep={30}
                        />
                      </TimePickerContainerFormItem>
                    )}
                  />

                  <ErrorMessage
                    name="time_start"
                    errors={errors}
                    render={({ message }) => (
                      <ErrorWrapper>{message}</ErrorWrapper>
                    )}
                  />
                </ClassContainer>

                <ClassContainer>
                  <Controller
                    name="time_end"
                    control={control}
                    render={({ field }) => (
                      <TimePickerContainerFormItem label="Class End" required>
                        <StyledTimePicker
                          disabledTime={() => ({
                            disabledHours: () => [
                              0, 1, 2, 3, 4, 5, 6, 7, 22, 23,
                            ],
                          })}
                          hideDisabledOptions
                          status={errors.time_end && 'error'}
                          size="large"
                          value={dayjs(new Date(field.value))}
                          use12Hours
                          format="h:mm a"
                          onChange={field.onChange}
                          needConfirm={false}
                          minuteStep={30}
                        />
                      </TimePickerContainerFormItem>
                    )}
                  />
                  <ErrorMessage
                    name="time_end"
                    errors={errors}
                    render={({ message }) => (
                      <ErrorWrapper>{message}</ErrorWrapper>
                    )}
                  />
                </ClassContainer>
              </Flex>
            </StyledFlex>
          </Flex>
          <ButtonWrapper>
            <StyledButton
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
              type="primary"
              size="large">
              Confirm
            </StyledButton>
          </ButtonWrapper>
        </Form>
      </Wrapper>
    </AddSubjectContainer>
  );
};
