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
  HiddenInput,
  ImageWrapper,
  StyledCloudUpload,
  StyledFlex,
  Wrapper,
} from './elements';
import React, { useRef, useState } from 'react';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  onSubmit: (data: CreateAccountDetails) => void;
  isSuccess?: boolean;
  isLoading?: boolean;
};

export const CreateAccount = ({ onSubmit, isLoading, isSuccess }: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      contact_number: '',
      access_type: '',
      username: '',
      password: '',
    },
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
    const newData = file ? { ...data, profile_picture: file } : data;
    onSubmit({ ...newData });
  };

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
                    />
                  </Form.Item>
                )}
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
                    />
                  </Form.Item>
                )}
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
                    />
                  </Form.Item>
                )}
              />
            </StyledFlex>
            <StyledFlex vertical>
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
                    />
                  </Form.Item>
                )}
              />

              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Form.Item label="Username" required>
                    <Input.Password
                      size="large"
                      value={field.value}
                      onChange={field.onChange}
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                )}
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
