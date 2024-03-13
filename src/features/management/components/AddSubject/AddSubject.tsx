import { Flex, Form, Input, Select } from 'antd';
import {
  AddSubjectContainer,
  StyledFlex,
  StyledTextArea,
  StyledTimePicker,
  TimePickerContainerFormItem,
  Wrapper,
} from './elements';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';

type Props = {};

export const AddSubject = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: '',
      description: '',
      code: '',
      name: '',
      units: 0,
      time_start: dayjs(new Date()),
      time_end: dayjs(new Date()),
    },
  });

  return (
    <AddSubjectContainer>
      <h1>Add Subject</h1>
      <Wrapper>
        <Form layout="vertical">
          <Flex gap="large">
            <StyledFlex vertical>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Assigned Teacher" required>
                    <Select
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
                <Controller
                  name="time_start"
                  control={control}
                  render={({ field }) => (
                    <TimePickerContainerFormItem label="Class Start" required>
                      <StyledTimePicker
                        size="large"
                        value={field.value}
                        use12Hours
                        format="h:mm a"
                        onChange={field.onChange}
                      />
                    </TimePickerContainerFormItem>
                  )}
                />

                <Controller
                  name="time_end"
                  control={control}
                  render={({ field }) => (
                    <TimePickerContainerFormItem label="Class End" required>
                      <StyledTimePicker
                        size="large"
                        value={field.value}
                        use12Hours
                        format="h:mm a"
                        onChange={field.onChange}
                      />
                    </TimePickerContainerFormItem>
                  )}
                />
              </Flex>
            </StyledFlex>
          </Flex>
        </Form>
      </Wrapper>
    </AddSubjectContainer>
  );
};
