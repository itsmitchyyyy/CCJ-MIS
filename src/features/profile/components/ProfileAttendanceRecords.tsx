import { TeacherAttendance } from '@/features/management/types';
import {
  AttendanceRecordsHeader,
  AttendanceRecordsListContainer,
  AttendanceRecordsWrapper,
  AttendanceStatusWrapper,
  FilterWrapper,
  StyledSelect,
  StyledTable,
} from './elements';
import { DatePicker, TableProps } from 'antd';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { AttendanceOptions } from '@/constants/data';
import dayjs from 'dayjs';

const _AttendanceOptions = [
  {
    value: 'all',
    label: 'All',
  },
  ...AttendanceOptions,
];

type Props = {
  data: TeacherAttendance[];
  isLoading?: boolean;
};

const ProfileAttendanceRecords = ({ data, isLoading }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const TableColumnData: TableProps<TeacherAttendance>['columns'] = [
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
        <AttendanceStatusWrapper status={record.status}>
          {record.status.toUpperCase()}
        </AttendanceStatusWrapper>
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
    <AttendanceRecordsWrapper>
      <AttendanceRecordsHeader>
        <h1>Attendance Records</h1>
      </AttendanceRecordsHeader>

      <AttendanceRecordsListContainer>
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
      </AttendanceRecordsListContainer>
    </AttendanceRecordsWrapper>
  );
};

export default ProfileAttendanceRecords;
