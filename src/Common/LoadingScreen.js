import React from "react";
import preloader from "../assets/preloader.gif";

export const LoadingScreen = () => {
	return (
		<div>
			<img src={preloader} className="preloaderImg" />
		</div>
	);
};
