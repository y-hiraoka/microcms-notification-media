import { Box, BoxProps } from "@chakra-ui/react";
import { format } from "date-fns";
import { FC } from "react";

type DatetimeProps = {
  datetime: string | Date;
  format: string;
} & BoxProps;

export const Datetime: FC<DatetimeProps> = ({
  datetime,
  format: formatString,
  ...props
}) => {
  const datetimeValue =
    datetime instanceof Date ? datetime : new Date(datetime);

  return (
    <Box as="time" {...props}>
      {format(datetimeValue, formatString)}
    </Box>
  );
};
