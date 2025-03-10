import {
	ChevronDown,
	Notifications,
	SearchOutline,
	Menu,
} from "react-ionicons";
import { default as cn } from "classnames";
import React from "react";

type NavbarProps = {
	setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ setOpenSidebar }: NavbarProps) => {

	return (
		// Navbar container
		<div className={cn(
			"fixed flex items-center justify-between",
			"px-4 h-[70px] top-0 w-full z-20",
			"border-b border-slate-300 bg-white"
		)}>
			{/* Sidebar toggle and board name */}
			<div className="flex items-center gap-3 cursor-pointer ">
				<Menu
					color="#fdba74"
					style={{ scale: '1.5' }}
					onClick={() => setOpenSidebar(prev => !prev)}
				/>

				<span className="font-semibold md:text-lg text-sm whitespace-nowrap flex items-center gap-1 ml-1 shrink-1 bg-gray-100 rounded-lg px-4 py-2">
					Board Name Super
					<ChevronDown
						width={"16px"}
						height={"16px"}
					/>
				</span>
			</div>

			{/* Search and notifications section */}
			<div className="flex items-center md:gap-3 gap-1 justify-between w-full max-w-[700px] md:ml-4 ml-2">
				{/* Search bar */}
				<div className={cn(
					"w-full",
					"bg-gray-100 rounded-lg",
					"flex items-center gap-2 px-3 md:py-[10px] py-[7px]"
				)}>
					<SearchOutline color={"#999"} />
					<input
						type="text"
						placeholder="Search"
						className="w-full bg-gray-100 outline-none text-[15px]"
					/>
				</div>

				{/* Notifications icon */}
				<Notifications
					color={"#fdba74"}
					className="cursor-pointer"
					style={{ scale: '1.3' }}
				/>
			</div>
		</div>
	);
};

export default Navbar;
