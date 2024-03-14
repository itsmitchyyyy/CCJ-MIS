import { Flex, Form, Input, Select } from 'antd';
import {
  AddSubjectContainer,
  ButtonWrapper,
  ClassContainer,
  ErrorWrapper,
  StyledButton,
  StyledFlex,
  StyledTextArea,
  StyledTimePicker,
  TimePickerContainerFormItem,
  Wrapper,
} from './elements';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { Subject } from '../../types';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  onSubmit: (data: Subject) => void;
};

export const AddSubject = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      user_id: '',
      description: '',
      code: '',
      name: '',
      units: 0,
      time_start: dayjs(new Date()).toDate(),
      time_end: dayjs(new Date()).toDate(),
    },
  });

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
                      status={errors.user_id && 'error'}
                      size="large"
                      value={field.value}
                      onChange={field.onChange}>
                      <Select.Option value="jack">Jack</Select.Option>
                      <Select.Option value="lucy">Lucy</Select.Option>
                      <Select.Option value="Yiminghe">yiminghe</Select.Option>
                    </Select>
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
                    <Input
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
                          status={errors.time_start && 'error'}
                          size="large"
                          value={dayjs(new Date(field.value))}
                          use12Hours
                          format="h:mm a"
                          onChange={field.onChange}
                          needConfirm={false}
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
                          status={errors.time_end && 'error'}
                          size="large"
                          value={dayjs(new Date(field.value))}
                          use12Hours
                          format="h:mm a"
                          onChange={field.onChange}
                          needConfirm={false}
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
