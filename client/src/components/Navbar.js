import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [err, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const history = useNavigate();
	useEffect(() => {
		setLoading(true);
		axios
			.get("api/v1/users/me", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status !== 200) {
					axios
						.get("api/v1/auth/refresh", {
							withCredentials: true,
						})
						.then((res) => {
							if (res.status !== 200) {
								setError("you are not allowed to log in");
							} else {
								setIsLoggedIn(true);
							}
						})
						.catch((e) => {
							setError(e.message);
							console.log("🚀 ---------------------------------------------🚀");
							console.log("🚀 ~ file: Navbar.js ~ line 27 ~ .then ~ e", e);
							console.log("🚀 ---------------------------------------------🚀");
						});
				}
			})
			.catch((e) => {
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Navbar.js ~ line 36 ~ useEffect ~ e", e);
				console.log("🚀 -------------------------------------------------🚀");
				axios
					.get("api/v1/auth/refresh", {
						withCredentials: true,
					})
					.then((res) => {
						if (res.status !== 200) {
							setError("you are not allowed to log in");
							history("/login");
						}
					})
					.catch((e) => {
						setError(e.message);
						console.log("🚀 ---------------------------------------------🚀");
						console.log("🚀 ~ file: Navbar.js ~ line 27 ~ .then ~ e", e);
						console.log("🚀 ---------------------------------------------🚀");
					});
			});

		setLoading(false);
	}, []);
	const handleLogOut = (e) => {
		e.preventDefault();
		axios.get("api/v1/auth/logout", { withCredentials: true }).then((res) => {
			if (res.status === 200) {
				history("/");
			} else {
				console.log("🚀 ------------------------------------------------🚀");
				console.log("🚀 ~ file: Login.js ~ line 19 ~ click ~ res", res);
				console.log("🚀 ------------------------------------------------🚀");
			}
		});
	};
	if (loading)
		return (
			<>
				<Navbar className="create" />
				<div className="create">Loading...</div>
			</>
		);

	return (
		<nav className="navbar">
			<h1>The Blog</h1>
			<div className="links">
				<Link to="/">Home</Link>
				{!isLoggedIn ? <Link to="/login"> Login </Link> : <></>}
				{!isLoggedIn ? <Link to="/register">Sign Up</Link> : <></>}
				<Link to="/Create">New Blog</Link>
			</div>
			<div className="blog-details" style={{ marginLeft: "40px" }}>
				<button onClick={handleLogOut}>log out</button>
			</div>
		</nav>
	);
}

export default Navbar;
