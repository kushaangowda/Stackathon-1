import React from "react";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
	{
		title: "Home",
		path: "/",
		icons: <AiIcons.AiFillHome />,
		CName: "nav-text",
	},
	{
		title: "Log Out",
		path: "https://dev-f-rf7g-f.us.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000",
		icons: <AiIcons.AiOutlineLogout />,
		CName: "nav-text",
	},
];
