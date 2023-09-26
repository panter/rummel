import React from 'react';
import { Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { dateFormat } from '../../../utils/date';

const { Text } = Typography;

export const Date: React.FC<{
  date: Dayjs | Date | string;
  format?: string;
}> = ({ date, format }) => {
  return <Text>{date ? dayjs(date).format(format || dateFormat) : date}</Text>;
};
