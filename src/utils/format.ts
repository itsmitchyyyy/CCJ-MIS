import moment from 'moment';

export const formatStringDate = (date: string, format: string) => {
  return moment(date, format).format(format);
};

export const formatDate = (date: string, format: string) => {
  return moment(date).format(format);
};
