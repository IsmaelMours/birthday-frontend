/** @format */


//import ProtectedRoute from "./security/ProtectedRoute";
import AuthProvider from "./security/auth/AuthContext";
import {
	RouterProvider,
	createBrowserRouter,

} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Signin from "./form/signin/Signin";
import SignupForm from "./form/signup/SignupForm";
import ProtectedRoute from "./security/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import GroupList from "./components/Group/GroupList";

function App({ children }) {
	const router = createBrowserRouter([
		{
			index: true,
			path: "/signin",
			element: <Signin />,
		},
		{
			path: "/signup",
			element: <SignupForm />,
		},

		{
			element: (
				<ProtectedRoute>
					<Sidebar />
				</ProtectedRoute>
			),
			children: [
				{
					path: "/",
					element: <Dashboard/>,
				},
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "/group",
					element: <GroupList/>,
				},

				// {
				// 	path: "/issues",
				// 	element: (
				// 		<ProtectedRoute>
				// 			<LogIssue />
				// 		</ProtectedRoute>
				// 	),
				// },
				// {
				// 	path: "/issues/:id",
				// 	element: (
				// 		<ProtectedRoute>
				// 			<LogIssue />
				// 		</ProtectedRoute>
				// 	),
				// },
			],
		},
	]);

	return (
		<AuthProvider>
			
				<RouterProvider router={router}>{children}</RouterProvider>
			
		</AuthProvider>
	);
}

export default App;
