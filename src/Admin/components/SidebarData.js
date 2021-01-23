import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { VscUnverified } from "react-icons/vsc";

export const SidebarData = [
	{
		title: "Home",
		path: "/",
		icons: <AiIcons.AiFillHome />,
		CName: "nav-text",
	},
	{
		title: "Requests",
		path: "/Requests",
		icons: <FaIcons.FaRegIdBadge />,
		CName: "nav-text",
	},
	{
		title: "Team",
		path: "/team",
		icons: <RiIcons.RiTeamLine />,
		CName: "nav-text",
	},
	{
		title: "Task",
		path: "/task",
		icons: <BiIcons.BiTask />,
		CName: "nav-text",
	},
	{
		title: "Employee",
		path: "/employee",
		icons: <IoIcons.IoIosPeople />,
		CName: "nav-text",
	},
	{
		title: "Verify Employee",
		path: "/verify",
		icons: <VscUnverified />,
		CName: "nav-text",
	},
	{
		title: "Document",
		path: "/docs",
		icons: <IoIcons.IoIosDocument />,
		CName: "nav-text",
	},
	{
		title: "Log Out",
		path: "https://dev-f-rf7g-f.us.auth0.com/v2/logout?returnTo=https%3A%2F%2Fstackathon.netlify.app",
		icons: <AiIcons.AiOutlineLogout />,
		CName: "nav-text",
	},
];
