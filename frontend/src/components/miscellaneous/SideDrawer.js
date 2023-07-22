import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { Box,Text } from '@chakra-ui/layout'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { Avatar } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user} = ChatState();
  const history = useHistory();

    const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };


  return (<>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
    <Tooltip label = "Search Users to chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
            <i className="fas fa-search"></i>
            <Text d={{base:"none", md:'flex'}}>Search User</Text>
        </Button>
    </Tooltip>
    <Text fontSize="2xl" fontFamily="Work sans">
        ChatRoom
    </Text>
    <div>
        <Menu>
            <MenuButton p={1}>
                <BellIcon />
            </MenuButton>
        </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
    </div>
  </Box>
    </>
  );
}

export default SideDrawer;
