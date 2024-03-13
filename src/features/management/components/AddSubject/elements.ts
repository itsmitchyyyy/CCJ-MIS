import { colors } from '@/constants/themes';
import { Flex, Form, Input, TimePicker } from 'antd';
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
