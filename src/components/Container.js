import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children, ...props }) => {
  return <ChakraContainer {...props}>{children}</ChakraContainer>;
};

Container.propTypes = {};

export default Container;
