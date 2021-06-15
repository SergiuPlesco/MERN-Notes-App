import { useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const ResetPassword = (props) => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();
	const params = useParams();

	const resetPasswordHandler = async (e) => {
		e.preventDefault();
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};

		if (password !== confirmPassword) {
			setPassword("");
			setConfirmPassword("");
			setTimeout(() => {
				setError("");
			}, 5000);
			return setError("Passwords don't match");
		}

		try {
			const { data } = await axios.put(`/resetpassword/${params.resetToken}`, { password }, config);
			setSuccess(data.data);
			history.push("/login");
		} catch (error) {
			console.log(error.response.data.error);
			setError(error.response.data.error);

			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};
	return (
		<div>
			{error && <span>{error}</span>}
			{success && (
				<span>
					{success} <Link to="/login">Login</Link>
				</span>
			)}
			<form onSubmit={resetPasswordHandler}>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						New Password:
					</label>
					<input
						autoComplete="off"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						required
						className="form-control"
						id="password"
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Confirm New Password:
					</label>
					<input
						autoComplete="off"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						required
						className="form-control"
						id="confirmPassword"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
