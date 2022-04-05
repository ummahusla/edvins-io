import { format, isValid, parse, parseISO } from 'date-fns';

export const formatToUniversalDate = (dateString) => {
  const universalDateFormat = 'MMM d, yyyy';

  if (dateString.includes('.')) {
    const parsedDottedDate = parse(dateString, 'dd.MM.yyyy', new Date());

    return isValid(parsedDottedDate) ? format(parsedDottedDate, universalDateFormat) : dateString;
  }

  if (dateString.includes('-')) {
    const parsedDashedDate = parseISO(dateString, 'yyyy-mm-dd', new Date());

    return isValid(parsedDashedDate) ? format(parsedDashedDate, universalDateFormat) : dateString;
  }

  return dateString;
};
