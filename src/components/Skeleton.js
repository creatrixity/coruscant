import { Skeleton as ChakraSkeleton } from "@chakra-ui/react";

const Skeleton = ({ children, ...props }) => {
  return <ChakraSkeleton {...props}>{children}</ChakraSkeleton>;
};

Skeleton.propTypes = {};

export default Skeleton;
