import { Outlet } from "react-router";
import {default as cn} from "classnames";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useState } from "react";
import * as motion from "motion/react-client"

const Layout = () => {

	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<div className="w-screen h-screen relative">
			<SideBar openSidebar={openSidebar}/>
			<Navbar setOpenSidebar={setOpenSidebar}/>
			<motion.div 
				animate={{ paddingLeft: openSidebar ? "250px" : "60px"}}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className={cn(
                	"pr-[20px] pt-[70px]",
                	"w-full h-full overflow-y-auto",
            	)
			}>
				<Outlet />
			</motion.div>
		</div>
	);
};

export default Layout;