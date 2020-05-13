import { Flex, Image, Link } from "@chakra-ui/core";
import NextLink from "next/link";

const NavBar = () => {
  return (
    <Flex
      as="header"
      h="4rem"
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="0 10px 20px 0 rgba(0,23,62,.05)"
      data-testid="header"
    >
      <Flex flexDirection="row" alignItems="center">
        <NextLink href="/">
          <Link>
            <Image
              alt="Movie"
              size="8"
              src="https://res.cloudinary.com/dlh9zzbt7/image/upload/f_auto,q_auto/v1589393274/movie/tomatometer-fresh.149b5e8adc3_v7dms3.svg"
            />
          </Link>
        </NextLink>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/favorites">
          <Link ml="8">Favorites</Link>
        </NextLink>
      </Flex>
      <Flex flexDirection="row" alignItems="center"></Flex>
    </Flex>
  );
};

export default NavBar;
