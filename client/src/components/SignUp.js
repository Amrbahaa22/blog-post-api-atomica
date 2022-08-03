import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

function SignUp() {
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isErr, setIsErr] = useState(false);

	const click = (event) => {
		event.preventDefault();
		axios
			.post(
				"http://localhost:8080/api/v1/auth/register",
				{
					email: email,
					name: name,
					password: password,
					passwordConfirm: confirmPassword,
				},
				{ withCredentials: true },
			)
			.then((res) => {
				if (res.status === 201) {
					setIsErr(false);
					setEmail("");
					setPassword("");
					history("/login");
				} else {
					console.log("🚀 -------------------------------------------------🚀");
					console.log("🚀 ~ file: SignUp.js ~ line 27 ~ .then ~ res", res);
					console.log("🚀 -------------------------------------------------🚀");
					setIsErr(true);
				}
			})
			.catch((e) => {
				console.log("🚀 ---------------------------------------------🚀");
				console.log("🚀 ~ file: SignUp.js ~ line 39 ~ .then ~ e", e);
				console.log("🚀 ---------------------------------------------🚀");

				setIsErr(true);
			});
	};
	return (
		<>
			<Navbar className="create" />

			<div className="create">
				<h2>SignUp</h2>
				{isErr ? (
					<>
						<div>email exists or passwords don't match </div>
					</>
				) : (
					<></>
				)}
				<form onSubmit={click}>
					<label>Email</label>
					<input required value={email} onChange={(e) => setEmail(e.target.value)} />

					<label>Name</label>
					<input required value={name} onChange={(e) => setName(e.target.value)} />

					<label>password</label>
					<input required value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

					<label>Confirm password</label>
					<input
						required
						value={confirmPassword}
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>

					<button>Submit</button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
