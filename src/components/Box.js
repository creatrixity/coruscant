import { Box as ChakraBox } from "@chakra-ui/react";

const Box = ({ children, ...props }) => {
  return <ChakraBox {...props}>{children}</ChakraBox>;
};

Box.propTypes = {};

export default Box;
