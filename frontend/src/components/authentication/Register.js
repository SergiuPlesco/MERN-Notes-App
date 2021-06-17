import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/services/UserServices";
import { registerError } from "../../redux/reducers/UserSlice";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			history.push("/");
		}
	}, [history]);

	const registerHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setPassword("");
			setConfirmPassword("");
			setTimeout(() => {
				setError("");
			}, 5000);
			return setError("Passwords do not match");
		}
		const newUser = { username, email, password };

		dispatch(registerUser(newUser))
			.then((response) => {
				if (response.meta.requestStatus === "rejected") {
					throw Error(response.payload);
				} else if (response.meta.requestStatus === "fulfilled") {
					history.push(`/login`);
				}
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
			{registerError && <div>{registerError}</div>}
			<form onSubmit={registerHandler}>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						Username:
					</label>
					<input
						autoComplete="off"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						className="form-control"
						id="username"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						autoComplete="off"
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						className="form-control"
						id="password"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmpassword" className="form-label">
						Confirm Password:
					</label>
					<input
						autoComplete="off"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						className="form-control"
						id="confirmpassword"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register
				</button>
				<div className="form-text">We'll never share your details with anyone else</div>
				<span className="form-text">
					Already have an account? <Link to="/login">Login</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
