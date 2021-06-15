import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/services/UserServices";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/");
		}
	}, [history]);

	const loginHandler = async (e) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }))
			.then((response) => {
				if (response.meta.requestStatus === "rejected") {
					throw Error(response.payload);
				} else if (response.meta.requestStatus === "fulfilled") {
					history.push(`/`);
				}
				localStorage.setItem("loggedIn", "user logged in");
			})
			.catch((error) => {
				setError(error.message);
				setTimeout(() => {
					setError("");
				}, 5000);
			});
	};
	return (
		<div>
			{error && <span>{error}</span>}
			<form onSubmit={loginHandler}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						autoComplete="off"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						className="form-control"
						id="email"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password:
					</label>
					<input
						autoComplete="off"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						className="form-control"
						id="password"
					/>
					<div className="form-text">We'll never share your details with anyone else</div>
				</div>

				<button type="submit" className="btn btn-primary">
					Log in
				</button>
				<span className="form-text">
					{" "}
					Do not have an account? <Link to="/register">Register</Link>
				</span>
				<span className="form-text">
					<span> / </span> <Link to="/forgotpassword"> Forgot Password?</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
