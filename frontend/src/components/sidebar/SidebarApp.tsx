// import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  // SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import pathRoutesPage from '../../routers/pathPage';
import { BiMenu } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
// import { MdOutlineJoinInner } from 'react-icons/md';
// import { BiChat } from 'react-icons/bi';

function SidebarApp() {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar style={{ height: '100vh' }}>
      <Menu>
        <MenuItem
          icon={<BiMenu size={20} />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h4>Store</h4>
        </MenuItem>
        {/*  */}
        <MenuItem
          onClick={() => {
            navigate(pathRoutesPage.home);
          }}
          icon={<IoHomeOutline size={20} />}
        >
          Home
        </MenuItem>

        {/*  */}
      </Menu>
    </Sidebar>
  );
}

export default SidebarApp;
