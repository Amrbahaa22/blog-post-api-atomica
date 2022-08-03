import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

function Login() {
	const history = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isErr, setIsErr] = useState(false);

	const click = (event) => {
		event.preventDefault();
		axios
			.post(
				"api/v1/auth/login",
				{
					email: email,
					password: password,
				},
				{ withCredentials: true },
			)
			.then((res) => {
				if (res.status === 200) {
					setIsErr(false);
					setEmail("");
					setPassword("");
					history("/");
				} else {
					console.log("🚀 ------------------------------------------------🚀");
					console.log("🚀 ~ file: Login.js ~ line 19 ~ click ~ res", res);
					console.log("🚀 ------------------------------------------------🚀");
					setIsErr(true);
				}
			})
			.catch((e) => {
				console.log("🚀 --------------------------------------------🚀");
				console.log("🚀 ~ file: Login.js ~ line 38 ~ click ~ e", e);
				console.log("🚀 --------------------------------------------🚀");
				setIsErr(true);
			});
	};
	return (
		<>
			<Navbar className="create" />

			<div className="create">
				<h2>Login</h2>
				{isErr ? (
					<>
						<div>username or password is not correct or user doesn't exist</div>
					</>
				) : (
					<></>
				)}
				<form onSubmit={click}>
					<label>Email</label>
					<input required value={email} onChange={(e) => setEmail(e.target.value)} />

					<label>password</label>
					<input required value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

					<button>Submit</button>
				</form>
			</div>
		</>
	);
}

export default Login;
