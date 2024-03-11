import { Button } from 'antd';
import {
  ButtonWrapper,
  ImageWrapper,
  TextDescription,
  TextHeader,
  Wrapper,
} from './elements';
import NotFoundImage from '@/assets/images/not-found.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ImageWrapper>
        <img src={NotFoundImage} />
      </ImageWrapper>

      <TextHeader>Page not found</TextHeader>
      <TextDescription>
        The page you are looking for could not be found. Please return to the
        previous page.
      </TextDescription>

      <ButtonWrapper>
        <Button shape="round" block type="primary" onClick={() => navigate(-1)}>
          Return
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default NotFound;
