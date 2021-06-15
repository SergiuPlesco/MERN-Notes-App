import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const forgotPasswordHandler = async (e) => {
		e.preventDefault();
		const config = {
			header: {
				"Content-Type": "application/json",
			},
		};

		try {
			const { data } = await axios.post("/forgotpassword", { email }, config);
			setSuccess(data.data);
		} catch (error) {
			setError(error.response.data.error);
			setEmail("");
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	};
	return (
		<div>
			{error && <span>{error}</span>}
			{success && <span>{success}</span>}
			<form onSubmit={forgotPasswordHandler}>
				<div className="mb-3">
					<p className="form-text">
						{" "}
						Please enter the email address you register your account with. We will send you reset
						password confirmation to this email
					</p>
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						required
						className="form-control"
						id="email"
					/>
				</div>

				<button type="submit" className="btn btn-primary">
					Send Email
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
