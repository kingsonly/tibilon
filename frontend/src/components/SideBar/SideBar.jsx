import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assests/company_logo.svg";

/**
 * SideBar is a component used to manage menu page navigation.
 * @function
 * @param {object}  props - keeps the links values.
 * @todo fix stability and ensure screen responsiveness
 * @return {HTMLElement}
 */

const Sidebar = ({ SideBarLinks }) => {
  return (
    <>
      <div data-testid="sidebarlinks">
        <div className="pb-[50px] overflow-auto flex flex-col h-screen fixed top-0 left-0 w-[273px] gap-y-[10px]">
          <div className="flex items-center justify-center bg-white h-[145px]">
            <img src={Logo} alt="logo" />
          </div>
          <div
            style={{
              background: "#FFFFFF",
              height: "100%",
              display: "flex",
              flexDirection: "column",

            }}
          >
            {SideBarLinks &&
              SideBarLinks.map((sideBar) => (
                <NavLink
                  data-testid={`sidebar_${sideBar.name}`}
                  key={sideBar.id}
                  to={sideBar.to}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "bg-[#F6F8FA] border-l-[10px] border-[#616161] flex flex-row gap-x-[24px] h-[64px] mt-[10px] nav-active text-[#D7B569]"
                      : "flex flex-row border-l-[10px] border-[#FFFFFF] h-[64px] mt-[10px] nav-style gap-x-[24px] text-[#7E7E7E] nav-inactive"
                  }
                  style={{
                    height: "64px",
                    display: "flex",
                    columnGap: "40px",
                    textDecoration: "none",
                    marginTop: "10px",
                    alignItems:'center'
                  }}
                >
                  <div className="show-active pl-2">
                    <sideBar.activeIcon />
                  </div>
                  <div className="show-inactive pl-2">
                    <sideBar.icon />
                  </div>
                  <span>{sideBar.name}</span>
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
