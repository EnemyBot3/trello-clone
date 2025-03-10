import React from "react";
import { default as cn } from "classnames";
import * as motion from "motion/react-client";
import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	NotificationsOutline,
	PersonCircleOutline,
	PieChartOutline,
	SettingsOutline,
} from "react-ionicons";


type SidebarProps = {
	openSidebar: boolean;
};


const Sidebar = ({ openSidebar }: SidebarProps) => {

	return (
		// animated sidebar
		<motion.div
			animate={{ width: openSidebar ? "230px" : "50px" }}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={cn("fixed left-0 top-0 overflow-hidden h-full flex flex-col z-10")}
		>
			<div className={cn(
				"w-full h-[calc(100vh-70px)]",
				"md:items-start items-center",
				"flex flex-col gap-2 py-3 px-2 top-[70px] relative",
				"border-r border-slate-300 bg-[#fff]"
			)}>
				<div className={cn(
					"overflow-y-auto overflow-x-hidden w-full", 
					{ "pr-1": openSidebar }
				)}>
					
					{navLinks.map((link) => 
						// animated link item
						<motion.div
							key={link.title}
							animate={{ padding: openSidebar ? "1rem 0.75rem" : "0.375rem" }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							className={cn(
								"flex items-center gap-2",
								"w-full rounded-lg ",
								"bg-transparent", { "!bg-orange-300 ": link.active },
								"cursor-pointer", { "!cursor-default": link.disabled },
								{"hover:!bg-orange-100": !link.active && !link.disabled}
							)}
						>
							{/* link icon */}
							{
								React.cloneElement(link.icon, {
									color: link.disabled ? "#9ca3af" : link.active ? "white" : "#555",
								})
							}
							
							{/* link text */}
							<span
								className={cn(
									"font-medium text-[15px]",
									{ "text-gray-400": link.disabled },
									{ "text-white": link.active },
									{ "hidden": !openSidebar }
								)}
							>
								{link.title}
							</span>
						</motion.div>
					)}

				</div>

				{/* log out button */}
				<motion.div
					animate={{ padding: openSidebar ? "1rem 0.75rem" : "0.375rem" }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className={cn(
						"flex items-center gap-2 mt-auto whitespace-nowrap",
						"w-full rounded-lg bg-gray-200",
						"hover:bg-orange-300 cursor-pointer"
					)}
				>
					{/* log out icon */}
					<LogOutOutline />
					{/* log out text */}
					<span className={cn("font-medium text-[15px] block", { "!hidden": !openSidebar })}> Log Out </span>
				</motion.div>
			</div>
		</motion.div>
	);
};

// Array links
const navLinks = [
	{
		title: "Home",
		icon: <HomeOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: false,
	},
	{
		title: "Boards",
		icon: <AppsOutline color="#555" width="22px" height="22px" />,
		active: true,
		disabled: false,
	},
	{
		title: "Projects",
		icon: <GridOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: true,
	},
	{
		title: "Analytics",
		icon: <PieChartOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: true,
	},
	{
		title: "Notifications",
		icon: <NotificationsOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: false,
	},
	{
		title: "Account",
		icon: <PersonCircleOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: false,
	},
	{
		title: "Setting",
		icon: <SettingsOutline color="#555" width="22px" height="22px" />,
		active: false,
		disabled: false,
	},
];

export default Sidebar;
