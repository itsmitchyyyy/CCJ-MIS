import { colors } from '@/constants/themes';
import { Button, Flex, Form, Input, TimePicker } from 'antd';
import styled from 'styled-components';

export const AddSubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3em;
  min-width: 800px;
  margin-top: 3em;
`;

export const StyledFlex = styled(Flex)`
  width: 100%;
`;

export const StyledTextArea = styled(Input.TextArea)`
  && {
    resize: none;
  }
`;

export const TimePickerContainerFormItem = styled(Form.Item)`
  width: 100%;
  margin-bottom: 5px;
`;

export const StyledTimePicker = styled(TimePicker)`
  width: 100%;

  .anticon {
    color: ${colors.keyColors.blackAlpha};

    &:hover {
      color: ${colors.keyColors.black};
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 50%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorWrapper = styled.p`
  color: ${colors.sysLight.error};
  margin: 0;
`;

export const ClassContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;
