import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unauthenticate } from "../redux/reducers/UserSlice";

const Navigation = () => {
	const [tokenExist, setIsTokenExist] = useState(false);
	const log = useSelector((state) => state.user.isAuthenticated);
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("loggedIn")) {
			setIsTokenExist(true);
		}
	}, [tokenExist, log]);

	const handleLogout = () => {
		dispatch(unauthenticate());
		localStorage.clear();
		setIsTokenExist(false);
	};
	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark p-3">
			<div className="container">
				<Link to="/" className="navbar-brand">
					Notes
				</Link>
				<div className="navbar-nav mr-auto">
					{(log || tokenExist) && (
						<>
							<li className="nav-item">
								<Link to={"/notes"} className="nav-link">
									Notes
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/add-note"} className="nav-link">
									Add Note
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/logout"} onClick={handleLogout} className="nav-link">
									Log out
								</Link>
							</li>
						</>
					)}
					{!(log || tokenExist) && (
						<>
							<li className="nav-item">
								<Link to={"/login"} className="nav-link">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/register"} className="nav-link">
									Register
								</Link>
							</li>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
