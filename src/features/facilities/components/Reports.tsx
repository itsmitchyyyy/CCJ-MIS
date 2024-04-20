import { FacilityReportOptions } from '@/constants/data';
import {
  FacilitiesHeader,
  FacilitiesListContainer,
  FacilitiesWrapper,
  FilterWrapper,
  StyledSelect,
  StyledTable,
} from './elements';
import { useSearchParams } from 'react-router-dom';
import { Space, TableProps } from 'antd';
import { FacilityRequestDTO } from '@/core/domain/dto/facility.dto';
import { formatDate } from '@/utils/format';
import { capitalizeStringWithSpace } from '@/utils/string';
import { FacilityType } from '../types';
import Statistic, { StatisticProps } from 'antd/es/statistic/Statistic';
import CountUp from 'react-countup';

type ReportProps = {
  isFetching?: boolean;
  isFetchingEquipments?: boolean;
  isFetchingDamagedEquipments?: boolean;
  facilityRequests: FacilityRequestDTO[];
  damagedEquipmentRequest: FacilityRequestDTO[];
  equipmentRequests: FacilityRequestDTO[];
};

const Reports = ({
  isFetching,
  isFetchingEquipments,
  isFetchingDamagedEquipments,
  facilityRequests,
  damagedEquipmentRequest,
  equipmentRequests,
}: ReportProps) => {
  const _FacilityReportOptions = [
    {
      value: 'all',
      label: 'All',
    },
    ...FacilityReportOptions,
  ];

  const tableDamagedColumns: TableProps<FacilityRequestDTO>['columns'] = [
    {
      title: 'Borrower Name',
      key: 'borrowerName',
      render: (_, record) => (
        <Space size="small">
          <span>{record.user.first_name}</span>
          <span>{record.user.last_name}</span>
        </Space>
      ),
    },
    {
      title: 'Equipment Name',
      key: 'equipmentName',
      render: (_, record) => (
        <Space size="small">
          <span>{record.facility.name}</span>
        </Space>
      ),
    },
    {
      title: 'Equipment Status',
      key: 'equipmentStatus',
      render: (_, record) => (
        <span>{capitalizeStringWithSpace(record.equipmentStatus || '')}</span>
      ),
    },
    {
      title: 'Borrow Date',
      key: 'borrowdate',
      render: (_, record) => (
        <span>{formatDate(record.borrowed_date || '', 'MMM DD, YYYY')}</span>
      ),
    },
  ];

  const tableBorrowColumns: TableProps<FacilityRequestDTO>['columns'] = [
    {
      title: 'Facility or Equipment Name',
      key: 'facilityName',
      render: (_, record) => (
        <Space size="small">
          <span>{record.facility.name}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      key: 'type',
      render: (_, record) => (
        <span>{capitalizeStringWithSpace(record.facility.type)}</span>
      ),
    },
    {
      title: 'Date reserve/borrow',
      key: 'date',
      render: (_, record) => (
        <span>
          {record.facility.type === FacilityType.Equipment
            ? formatDate(record.borrowed_date || '', 'MMM DD, YYYY')
            : formatDate(record.reservation_date || '', 'MMM DD, YYYY')}
        </span>
      ),
    },
  ];

  const tableReturnColumns: TableProps<FacilityRequestDTO>['columns'] = [
    {
      title: ' Equipment Name',
      key: 'equipmentName',
      render: (_, record) => (
        <Space size="small">
          <span>{record.facility.name}</span>
        </Space>
      ),
    },
    {
      title: 'Borrower Name',
      key: 'borrowerName',
      render: (_, record) => (
        <Space size="small">
          <span>{record.user.first_name}</span>
          <span>{record.user.last_name}</span>
        </Space>
      ),
    },
    {
      title: 'Returned Date',
      key: 'date',
      render: (_, record) => (
        <span>{formatDate(record.returned_date || '', 'MMM DD, YYYY')}</span>
      ),
    },
  ];

  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeType = (value: any, _: any) => {
    if (value === 'All' && searchParams.has('type')) {
      searchParams.delete('type');
    } else {
      searchParams.set('type', value);
    }

    setSearchParams(searchParams);
  };

  return (
    <FacilitiesWrapper>
      <FacilitiesHeader>
        <h1>Reports</h1>
      </FacilitiesHeader>
      <FacilitiesListContainer>
        <FilterWrapper>
          <StyledSelect
            defaultValue={searchParams.get('type') || 'all'}
            onChange={handleChangeType}
            options={_FacilityReportOptions}
          />
        </FilterWrapper>

        <Space direction="vertical" size="small">
          {['all', 'damage'].includes(
            searchParams.get('type')?.toLocaleLowerCase() || 'all',
          ) && (
            <>
              <h4>Damaged</h4>
              <Statistic
                title="Total Damaged"
                value={damagedEquipmentRequest.length}
                formatter={formatter}
              />
              <StyledTable
                loading={isFetchingDamagedEquipments}
                columns={tableDamagedColumns}
                dataSource={damagedEquipmentRequest}
                rowKey="id"
              />
            </>
          )}

          {['all', 'borrow'].includes(
            searchParams.get('type')?.toLocaleLowerCase() || 'all',
          ) && (
            <>
              <h4>Borrow</h4>
              <Statistic
                title="Total Borrows"
                value={facilityRequests.length}
                formatter={formatter}
              />
              <StyledTable
                loading={isFetching}
                columns={tableBorrowColumns}
                dataSource={facilityRequests}
                rowKey="id"
              />
            </>
          )}

          {['all', 'return'].includes(
            searchParams.get('type')?.toLocaleLowerCase() || 'all',
          ) && (
            <>
              <h4>Return</h4>
              <Statistic
                title="Total Returns"
                value={equipmentRequests.length}
                formatter={formatter}
              />
              <StyledTable
                loading={isFetchingEquipments}
                columns={tableReturnColumns}
                dataSource={equipmentRequests}
                rowKey="id"
              />
            </>
          )}
        </Space>
      </FacilitiesListContainer>
    </FacilitiesWrapper>
  );
};

export default Reports;
