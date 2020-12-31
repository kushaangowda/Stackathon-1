import React from "react";
import { LoginButton } from "./LoginButton";

function DevelopersText() {
	return (
		<div className="Text1 dev1">
			<p className="text1stuff">Developers</p>
			<a target="_blank" className="devlink" href="https://github.com/gg-dev-05">
				Garvit Galgat
			</a>
			<a target="_blank" className="devlink" href="https://github.com/khushi935">
				Khushi
			</a>
			<a target="_blank" className="devlink" href="https://github.com/kushaangowda">
				Kushaan Gowda
			</a>
			<a target="_blank" className="devlink last" href="https://github.com/vaibhavviking">
				Vaibhav Chandra
			</a>
			<LoginButton />
		</div>
	);
}

export default DevelopersText;
