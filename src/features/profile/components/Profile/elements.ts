import { colors } from '@/constants/themes';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
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

export const ChangePasswordWrapper = styled.a``;
