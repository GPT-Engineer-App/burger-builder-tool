import { useState } from "react";
import { Container, VStack, Text, Button, IconButton, Image, Box } from "@chakra-ui/react";
import { FaHamburger, FaPlus, FaMinus } from "react-icons/fa";

const Index = () => {
  const [burger, setBurger] = useState([]);
  const [currentLayer, setCurrentLayer] = useState("");

  const addLayer = (layer) => {
    setBurger([...burger, layer]);
  };

  const removeLayer = () => {
    setBurger(burger.slice(0, -1));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Build Your Burger</Text>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton aria-label="Add Meat" icon={<FaPlus />} onClick={() => addLayer("meat")} />
          <IconButton aria-label="Remove Layer" icon={<FaMinus />} onClick={removeLayer} />
        </Box>
        <Box width="200px" height="400px" border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden" position="relative">
          {burger.map((layer, index) => (
            <Image key={index} src={`https://images.unsplash.com/photo-1534681551083-8dd98c54aaab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHwlMjQlN0JsYXllciU3RCUyMGxheWVyfGVufDB8fHx8MTcxNzUxNzY1OXww&ixlib=rb-4.0.3&q=80&w=1080`} alt={`${layer} layer`} position="absolute" bottom={`${index * 20}px`} width="100%" />
          ))}
        </Box>
        <Button leftIcon={<FaHamburger />} colorScheme="teal" onClick={() => setBurger([])}>
          Reset Burger
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
