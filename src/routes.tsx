import { RouteObject } from "react-router";
import Layout from "./layout";
import Boards from "./pages/Boards";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		errorElement: <div>404 Not Found</div>,
		children: [
			{
				children: [
					{
						path: "",
						element: <Boards />,
					},
				],
			},
		],
	},
];

export default routes; 