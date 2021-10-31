import { Select as ChakraSelect } from "@chakra-ui/react";

const Select = ({ children, ...props }) => {
  return <ChakraSelect {...props}>{children}</ChakraSelect>;
};

Select.propTypes = {};

export default Select;
