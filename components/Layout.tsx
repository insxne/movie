import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/core";

interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <Box m="10%" mt="8">
    <Stack spacing="8">
      {title && (
        <Text borderLeft="5px solid tomato" pl="4" as="h1" fontSize="2xl">
          {title}
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} gridAutoRows="1fr">
        {children}
      </SimpleGrid>
    </Stack>
  </Box>
);

export { Layout };
