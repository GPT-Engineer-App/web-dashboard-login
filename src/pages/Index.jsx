import React, { useState } from "react";
import { Container, Box, VStack, HStack, Text, Input, Button, FormControl, FormLabel, IconButton, Flex, Spacer, Avatar, Menu, MenuButton, MenuList, MenuItem, useToast, Grid, GridItem, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaUser, FaSignOutAlt, FaCog, FaBell, FaHome, FaUsers, FaChartBar, FaFileAlt, FaUserAlt, FaLock } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      onLogin(true);
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your username and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Login</Text>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.300" />} />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaLock color="gray.300" />} />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputGroup>
        </FormControl>
        <Button onClick={handleLogin} colorScheme="teal" width="100%">
          Login
        </Button>
      </VStack>
    </Container>
  );
};

const Dashboard = () => {
  return (
    <Container maxW="container.xl" height="100vh" display="flex" flexDirection="column">
      <TopBar />
      <Flex flex="1" mt={4}>
        <SideMenu />
        <Box flex="1" p={4}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <DashboardCard title="Employees" icon={FaUsers} />
            <DashboardCard title="Reports" icon={FaFileAlt} />
            <DashboardCard title="Analytics" icon={FaChartBar} />
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
};

const TopBar = () => {
  return (
    <Flex as="header" width="100%" p={4} bg="teal.500" color="white" alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        Dashboard
      </Text>
      <Spacer />
      <HStack spacing={4}>
        <IconButton aria-label="Notifications" icon={<FaBell />} />
        <IconButton aria-label="Settings" icon={<FaCog />} />
        <Menu>
          <MenuButton as={IconButton} icon={<Avatar size="sm" />} />
          <MenuList>
            <MenuItem icon={<FaUser />}>Profile</MenuItem>
            <MenuItem icon={<FaCog />}>Settings</MenuItem>
            <MenuItem icon={<FaSignOutAlt />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

const SideMenu = () => {
  return (
    <Box as="nav" width={{ base: "100%", md: "250px" }} p={4} bg="gray.100">
      <VStack align="start" spacing={4}>
        <MenuItem icon={<FaHome />}>Home</MenuItem>
        <MenuItem icon={<FaUsers />}>Employees</MenuItem>
        <MenuItem icon={<FaFileAlt />}>Reports</MenuItem>
        <MenuItem icon={<FaChartBar />}>Analytics</MenuItem>
      </VStack>
    </Box>
  );
};

const DashboardCard = ({ title, icon }) => {
  return (
    <GridItem w="100%" h="200px" bg="white" boxShadow="md" borderRadius="md" p={4} _hover={{ boxShadow: "lg" }}>
      <VStack align="start" spacing={4}>
        <HStack>
          <Box as={icon} size="24px" />
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <Text>Some content here...</Text>
      </VStack>
    </GridItem>
  );
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? <Dashboard /> : <Login onLogin={setIsLoggedIn} />;
};

export default Index;
