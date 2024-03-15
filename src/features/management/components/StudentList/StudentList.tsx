import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';
import {
  StudentListContainer,
  StudentListHeader,
  StudentListWrapper,
  StyledTable,
} from './elements';

export const StudentList = () => {
  return (
    <StudentListWrapper>
      <StudentListHeader>
        <h1>Student List</h1>
      </StudentListHeader>
      <StudentListContainer>
        <StyledTable
          columns={TableColumnDummyData}
          dataSource={TableDummyData}
        />
      </StudentListContainer>
    </StudentListWrapper>
  );
};
