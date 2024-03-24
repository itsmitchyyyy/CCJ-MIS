import { AttendanceOptions } from '@/constants/data';
import {
  AttendanceListContainer,
  AttendanceListHeader,
  AttendanceListWrapper,
  AttendanceWrapper,
  FilterWrapper,
  StyledSelect,
  StyledTable,
} from './elements';
import { Attendance } from '../../types';
import { DatePicker, TableProps } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { User } from '@/core/domain/entities/user.entity';
import dayjs from 'dayjs';

const _AttendanceOptions = [
  {
    value: 'all',
    label: 'All',
  },
  ...AttendanceOptions,
];

type Props = {
  data: Attendance[];
  student: User;
  isLoading?: boolean;
};

export const AttendanceRecord = ({ data, student, isLoading }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const TableColumnData: TableProps<Attendance>['columns'] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => moment(date).format('MMMM DD, YYYY'),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <AttendanceWrapper status={record.status}>
          {record.status.toUpperCase()}
        </AttendanceWrapper>
      ),
    },
  ];

  const handleChangeStatus = (value: any, _: any) => {
    if (value === 'all' && searchParams.has('status')) {
      searchParams.delete('status');
    } else {
      searchParams.set('status', value);
    }

    setSearchParams(searchParams);
  };

  const handleChangeDate = (_: dayjs.Dayjs, dates: string | string[]) => {
    if (dates.length === 0 && searchParams.has('date')) {
      searchParams.delete('date');
    } else {
      searchParams.set('date', dates as string);
    }

    setSearchParams(searchParams);
  };

  return (
    <AttendanceListWrapper>
      <AttendanceListHeader>
        <h1>
          {student.first_name} {student.last_name}'s Attendance Record
        </h1>
      </AttendanceListHeader>
      <AttendanceListContainer>
        <FilterWrapper>
          <StyledSelect
            defaultValue={searchParams.get('status') || 'all'}
            onChange={handleChangeStatus}
            options={_AttendanceOptions}
          />

          <DatePicker onChange={handleChangeDate} />
        </FilterWrapper>

        <StyledTable
          columns={TableColumnData}
          loading={isLoading}
          dataSource={data}
          rowKey="id"
        />
      </AttendanceListContainer>
    </AttendanceListWrapper>
  );
};
