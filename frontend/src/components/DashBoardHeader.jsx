import React, { useEffect, useState } from "react";
import { ReactComponent as Bell } from "../assests/ringing 2.svg";
import { ReactComponent as Avatar } from "../assests/avatar.svg";
import { ReactComponent as ArrowBottom } from "../assests/arrow_bottom.svg";
import { Link } from "react-router-dom";

/**
 * Represents the header component.
 * @function
 * @param {string} title - stores the title of page.
 * @Description - this component displays the dasboard card which includes page title
 * user name, avatar
 *
 */

const dropDownTitles = [
  { id: 1, name: "Employee", link: "/employee" },
  { id: 2, name: "Affiliates", link: "/affiliates" },
];
export default function DashBoardHeader({ title }) {
  const [showDropDown, setshowDropDown] = useState(false);
  const [selectedDropdown, setselectedDropdown] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    bootstrap()
  },[])

  const bootstrap = () => {
    if(localStorage.getItem('name') !== null){
      setName(localStorage.getItem('name'))
      return
    }
    setName("Name")
  }

  return (
    <div
      className="h-[96px] bg-white ml-[300px] mb-[25px] flex justify-between items-center pl-11 pr-9"
    >
      <div className="font-medium text-xl">{title}</div>
      <div className="flex gap-x-12 items-center">
        <div>
          <Bell className="cursor-pointer" data-testid="bell" />
        </div>
        <div className="flex gap-x-2 relative">
          <div>Welcome {name}</div>
          <div>
            <button
              role="menu"
              onClick={() => setshowDropDown((prevState) => !prevState)}
            >
              <ArrowBottom className="cursor-pointer" />
            </button>
          </div>

          {showDropDown && (
            <div
              className={`flex flex-col bg-white absolute top-[30px] right-[0px] border-2 border-[#B1B2B2]
              `}
            >
              {dropDownTitles.map((dropdowntitle) => (
                <Link
                  to={dropdowntitle.link}
                  className={`px-6 py-2 cursor-pointer ${
                    dropdowntitle.id === selectedDropdown && "bg-[#F7F8FA]"
                  }`}
                  key={dropdowntitle.id}
                  onClick={() => setselectedDropdown(dropdowntitle.id)}
                >
                  {dropdowntitle.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div>
          <Avatar />
        </div>
      </div>
    </div>
  );
}
