import { colors } from '@/constants/themes';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ErrorMessage } from '@hookform/error-message';
import { Button, Flex, Select } from 'antd';
import styled from 'styled-components';

export const ManageAccountWrapper = styled.div``;

export const ManageAccountHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CreateAccountButton = styled(Button)`
  display: flex;
  justify-content: end;
`;

export const ManageAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const StyledSelect = styled(Select)`
  width: 120px;
`;

export const CreateAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3em;
  gap: 3em;
  min-width: 800px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledFlex = styled(Flex)`
  width: 100%;
`;

export const StyledCloudUpload = styled(CloudUploadOutlined)`
  color: ${colors.keyColors.danger};
`;

export const ImageWrapper = styled.div`
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;
