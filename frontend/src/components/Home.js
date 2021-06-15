import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [userLoggedIn, setUserLoggedin] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("loggedIn")) {
			setUserLoggedin(true);
		}
	}, [userLoggedIn]);
	return (
		<div>
			<div className="px-4 py-5 my-5 text-center">
				<h1 className="display-5 fw-bold">A better way to make notes</h1>
				<p className="lead mb-4">Create, read, update and delete your notes</p>
			</div>
			<div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
				<div className="col">
					<div
						className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
						style={{
							backgroundImage: `url(
								"https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"
							)`,
						}}
					>
						<div className="d-flex flex-column h-100 p-5 text-white text-shadow-1">
							<h2 className="py-5 mt-5 mb-4 display-6 lh-1 fw-bold">
								Write notes in a easy and fast way
							</h2>
						</div>
					</div>
				</div>
				<div className="col">
					<div
						className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
						style={{
							backgroundImage: `url(
								"https://images.unsplash.com/photo-1616628188538-0bc97a2f741b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
							)`,
						}}
					>
						<div className="d-flex flex-column h-100 p-5 text-white text-shadow-1">
							<h2 className="py-5 mt-5 mb-4 display-6 lh-1 fw-bold">
								Keep your mind clear with this app
							</h2>
						</div>
					</div>
				</div>
				<div className="col">
					<div
						className="card card-cover h-100 overflow-hidden bg-dark rounded-5 shadow-lg"
						style={{
							backgroundImage: `url(
								"https://images.unsplash.com/photo-1585692614056-d0bbd2d5069b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
							)`,
						}}
					>
						<div className="d-flex flex-column h-100 p-5 text-white text-shadow-1">
							<h2 className="py-5 mt-5 mb-4 display-6 lh-1 fw-bold">
								You will have more time to do something else
							</h2>
						</div>
					</div>
				</div>
			</div>
			{!userLoggedIn && (
				<div className="px-4 py-5 my-5 text-center">
					<p className="lead mb-4">
						<Link to={"/login"}>Log in </Link>or <Link to={"/register"}>Register</Link> and manage
						your notes.
					</p>
				</div>
			)}
		</div>
	);
};

export default Home;
