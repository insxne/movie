import { ChangeEvent, FormEvent } from "react";
import { Flex, Box, Input, Button, FormLabel } from "@chakra-ui/core";
import { useAppContext } from "../contexts/app";

interface SearchFormProps {
  onSubmit: (search: string) => Promise<void>;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const { search, setSearch, isSubmitting, setIsSubmitting } = useAppContext();

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting((isSubmitting) => !isSubmitting);
    onSubmit(search).then(() => setIsSubmitting(false));
  };

  return (
    <form data-testid="search-form" onSubmit={handleSubmit}>
      <Flex m="5%" alignItems="center" justifyContent="center">
        <Box w="40%" minW="150px">
          <FormLabel p="0" w="100%" htmlFor="search">
            <Input
              placeholder="Search any movie"
              type="text"
              id="search"
              name="search"
              aria-describedby="search"
              onChange={onChange}
              value={search}
              data-testid="input-search-form"
            />
          </FormLabel>
        </Box>
        <Box ml="4">
          <Button
            data-testid="button-search-form"
            variantColor="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            Search
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default SearchForm;
