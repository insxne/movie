import NextLink from "next/link";
import { Box, Flex, Skeleton } from "@chakra-ui/core";

const CardSkeleton = () => {
  return (
    <Flex
      flexDirection="column"
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      justifyContent="space-between"
    >
      <Box p="4">
        <Skeleton h="350px"></Skeleton>
      </Box>
    </Flex>
  );
};

export default CardSkeleton;
