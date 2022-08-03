import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function Create() {
	const navigate = useNavigate();
	const [title, setInput] = useState("");
	const [text, setText] = useState("");
	const [err, setError] = useState();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState();

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:8080/api/v1/users/me", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status !== 200) {
					console.log("🚀 -------------------------------------------------🚀");
					console.log("🚀 ~ file: Create.js ~ line 21 ~ .then ~ res", res);
					console.log("🚀 -------------------------------------------------🚀");
					navigate("/login");
				} else {
					setUser(res.data.data.user.id);
				}
			})
			.catch((e) => {
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Create.js ~ line 31 ~ useEffect ~ e", e);
				console.log("🚀 -------------------------------------------------🚀");
				navigate("/login");
			});

		setLoading(false);
	}, [navigate]);

	const click = (event) => {
		setLoading(true);
		event.preventDefault();
		axios
			.post(
				"http://localhost:8080/api/v1/posts/",
				{
					title: title,
					content: text,
					user: user,
				},
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Create.js ~ line 56 ~ .then ~ res", res);
				console.log("🚀 -------------------------------------------------🚀");
				if (res.status === 201) {
					setInput("");
					setText("");
					navigate("/");
				}
			})
			.catch((e) => {
				setError("you are not allowed to create blog with the same title");
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Create.js ~ line 31 ~ useEffect ~ e", e);
				console.log("🚀 -------------------------------------------------🚀");
			});

		setLoading(false);
	};
	if (loading)
		return (
			<>
				<Navbar className="create" />
				<div className="create">Loading...</div>
			</>
		);
	return (
		<>
			<Navbar className="create" />
			<div className="create">
				{err && <div className="create">{err}</div>}
				<h2>Add new blog</h2>
				<form onSubmit={click}>
					<label>Blog title :</label>
					<input required value={title} onChange={(e) => setInput(e.target.value)} />

					<label>Blog body :</label>
					<textarea required value={text} onChange={(e) => setText(e.target.value)}></textarea>

					<button>Submit</button>
				</form>
			</div>
		</>
	);
}

export default Create;
