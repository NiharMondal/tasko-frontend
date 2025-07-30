import React from "react";

export default function Navbar() {
	return (
		<header className="h-20">
			<nav className="px-5 sm:px-10 md:px-20 flex items-center justify-between h-full">
				<div>Logo</div>
				<ul>
					<li>Task</li>
					<li>Spin</li>
				</ul>
				<div>User</div>
			</nav>
		</header>
	);
}
