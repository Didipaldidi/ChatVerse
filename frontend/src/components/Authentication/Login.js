import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  // State variables to manage form input and loading state
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  // Chakra-UI toast component to display notifications
  const toast = useToast();

  // React Router history for programmatic navigation
  const history = useHistory();

  // Access the user state and setUser function from ChatState context
  const { setUser } = ChatState();

  // Toggle password visibility when clicking the "Show" button
  const handleClick = () => setShow(!show);

  // Function to handle form submission on login button click
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      // Display a warning toast if any field is empty
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Send a POST request to the server to log in the user
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      // Display a success toast on successful login
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Set the user data in the ChatState context
      setUser(data);

      // Store the user info in local storage for session persistence
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // Redirect the user to the "/chats" page after successful login
      history.push("/chats");
    } catch (error) {
      // Display an error toast if there's an error during login
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    // Chakra-UI VStack to stack the form components vertically
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        {/* InputGroup to allow showing/hiding password */}
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          {/* InputRightElement to render the "Show" button */}
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {/* Show or Hide text based on the password visibility */}
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* Login button to trigger the submitHandler */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      {/* Button to pre-fill the email and password for guest users */}
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
