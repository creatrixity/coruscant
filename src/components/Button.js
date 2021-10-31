import { Button as ChakraButton } from "@chakra-ui/react";

const Button = ({ children, ...props }) => {
  return <ChakraButton {...props}>{children}</ChakraButton>;
};

Button.propTypes = {};

export default Button;
