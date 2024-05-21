import moment from 'moment';

export const formatStringDate = (date: string, format: string) => {
  return moment(date, format).format(format);
};

export const formatDate = (date: string, format: string) => {
  return moment(date).format(format);
};

export const inboxDateFormatter = (date: string) => {
  if (moment(date).isSame(moment(), 'day')) {
    return formatDate(date, 'h:mm a');
  }

  return formatDate(date, 'MMM D');
};

export const humanDateFormatter = (date: string) => {
  if (date === '') {
    return '';
  }

  return moment(date).fromNow();
};
