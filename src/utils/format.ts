import moment from 'moment';

export const formatStringDate = (date: string, format: string) => {
  return moment(date, format).format(format);
};
