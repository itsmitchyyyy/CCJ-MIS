import { GlobalStyle, TeacherListHeader, TeacherListWrapper } from './elements';

export const TeacherList = () => {
  return (
    <>
      <GlobalStyle />
      <TeacherListWrapper>
        <TeacherListHeader>
          <h1>Teachers</h1>
        </TeacherListHeader>
      </TeacherListWrapper>
    </>
  );
};
