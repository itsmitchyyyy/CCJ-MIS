import { StyledCard, StyledText, Wrapper } from './elements';

const DashboardDetails = () => {
  return (
    <Wrapper>
      <StyledCard title="Vision" bordered={false}>
        <StyledText>
          To provide our customers with the most convenient shoppingexperience
        </StyledText>
      </StyledCard>
      <StyledCard title="Mission">
        <StyledText>To be the world's leading online retailer.</StyledText>
      </StyledCard>
    </Wrapper>
  );
};

export { DashboardDetails };
