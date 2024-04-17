import { TabItemOptions } from '@/constants/data';
import { Tab } from '../types';
import {
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  StyledTable,
} from './elements';
import { TableColumnDummyData, TableDummyData } from '@/constants/dummyData';
import { Tabs } from 'antd';

type RequestFacilityProps = {
  isFetching?: boolean;
};

const RequestFacility = ({ isFetching }: RequestFacilityProps) => {
  const tabItems: Tab[] = TabItemOptions.map((item) => ({
    label: item.label,
    key: item.key,
    children: (
      <StyledTable
        loading={isFetching}
        columns={TableColumnDummyData}
        dataSource={TableDummyData}
        rowKey="id"
      />
    ),
  }));

  return (
    <FacilitiesWrapper>
      <FacilitiesHeader>
        <h1>Facility Requests</h1>
      </FacilitiesHeader>

      <FacilitiesListContainer>
        <Tabs tabPosition="left" items={tabItems} />
      </FacilitiesListContainer>
    </FacilitiesWrapper>
  );
};

export default RequestFacility;
