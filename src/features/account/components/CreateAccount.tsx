import {
  Avatar,
  Badge,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import {
  AvatarWrapper,
  CreateAccountContainer,
  ErrorWrapper,
  HiddenInput,
  ImageWrapper,
  StyledCloudUpload,
  StyledFlex,
  Wrapper,
} from './elements';
import React, { useEffect, useRef, useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validation';
import { RoleType } from '../types';
import { ErrorMessage } from '@hookform/error-message';
import { useGlobalState } from '@/hooks/global';
import { CreateAccountDetails } from '@/features/profile/types';

const DefaultFormValues = {
  first_name: '',
  last_name: '',
  contact_number: '',
  email: '',
  access_type: 'student' as RoleType,
  username: '',
  password: '',
};

type Props = {
  onSubmit: (data: CreateAccountDetails) => void;
  isSuccess?: boolean;
  isLoading?: boolean;
};

export const CreateAccount = ({ onSubmit, isLoading, isSuccess }: Props) => {
  const {
    useAccount: { accountError },
  } = useGlobalState();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: DefaultFormValues,
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onClickSubmit = (data: CreateAccountDetails) => {
    const newAccountData = { ...data, password_confirmation: data.password };
    const newData = file
      ? { ...newAccountData, profile_picture: file }
      : newAccountData;
    onSubmit({ ...newData });
  };

  useEffect(() => {
    if (accountError.errors) {
      Object.keys(accountError.errors).forEach((key: any) => {
        setError(key, { type: 'custom', message: accountError.errors[key] });
      });
    }
  }, [accountError]);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <CreateAccountContainer>
      <h1>Create Account</h1>
      <Wrapper>
        <Row>
          <Col span={24}>
            <AvatarWrapper>
              <ImageWrapper onClick={() => fileRef.current?.click()}>
                <Badge count={<StyledCloudUpload />}>
                  <Avatar size={68} src={imageUrl} icon={<UserOutlined />} />
                  <HiddenInput
                    type="file"
                    ref={fileRef}
                    onChange={handleChangeFile}
                  />
                </Badge>
              </ImageWrapper>
            </AvatarWrapper>
          </Col>
        </Row>
        <Form layout="vertical">
          <Flex gap="middle">
            <StyledFlex vertical>
              <ErrorMessage
                name="first_name"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <Form.Item label="First Name" required>
                    <Input
                      name="first_name"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.first_name && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="last_name"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Last Name" required>
                    <Input
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.last_name && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="contact_number"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="contact_number"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Contact Number" required>
                    <Input
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.contact_number && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="email"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Email" required>
                    <Input
                      type="email"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.email && 'error'}
                    />
                  </Form.Item>
                )}
              />
            </StyledFlex>
            <StyledFlex vertical>
              <ErrorMessage
                name="username"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Username" required>
                    <Input
                      type="text"
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      status={errors.username && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="password"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Password" required>
                    <Input.Password
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      status={errors.password && 'error'}
                    />
                  </Form.Item>
                )}
              />

              <ErrorMessage
                name="access_type"
                errors={errors}
                render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
              />
              <Controller
                name="access_type"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Role" required>
                    <Select
                      size="large"
                      value={field.value}
                      onChange={field.onChange}>
                      <Select.Option value="student">Student</Select.Option>
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="teacher">Teacher</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              />
            </StyledFlex>
          </Flex>
          <Button
            onClick={handleSubmit(onClickSubmit)}
            disabled={isLoading}
            block
            type="primary"
            size="large">
            Save
          </Button>
        </Form>
      </Wrapper>
    </CreateAccountContainer>
  );
};
