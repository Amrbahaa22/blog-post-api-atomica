import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Blogdetails() {
	const history = useNavigate();
	const { id } = useParams();
	const [showDelete, setShowDelete] = useState();
	const [data, setData] = useState();
	const [err, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:8080/api/v1/posts/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					setData(res.data.data);
				} else {
					setError("you are not allowed to log in");
				}
			})
			.catch((e) => {
				console.log("🚀 ------------------------------------------------------🚀");
				console.log("🚀 ~ file: Blogdetails.js ~ line 29 ~ useEffect ~ e", e);
				console.log("🚀 ------------------------------------------------------🚀");
				setError(e.message);
			});
	}, [id]);
	useEffect(() => {
		setLoading(true);
		if (data) {
			axios
				.get("http://localhost:8080/api/v1/users/me", {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status === 200) {
						setShowDelete(res.data.data.user.id === data.user);
					} else {
						setError("you are not allowed to log in");
					}
				})
				.catch((e) => {
					console.log("🚀 ------------------------------------------------------🚀");
					console.log("🚀 ~ file: Blogdetails.js ~ line 51 ~ useEffect ~ e", e);
					console.log("🚀 ------------------------------------------------------🚀");
				});
			setLoading(false);
		}
	}, [data]);

	const click = async () => {
		setLoading(true);
		try {
			await axios.delete(`http://localhost:8080/api/v1/posts/${id}`, {
				withCredentials: true,
			});
			history("/");
		} catch (e) {
			console.log("🚀 --------------------------------------------------🚀");
			console.log("🚀 ~ file: Blogdetails.js ~ line 65 ~ click ~ e", e);
			console.log("🚀 --------------------------------------------------🚀");

			setError(e.message);
		}
		setLoading(false);
	};
	return (
		<>
			<Navbar />
			<div className="blog-details">
				{loading && <div>Loading...</div>}
				{err && <div>{err}</div>}
				{data && (
					<article>
						<h2>{data.title}</h2>
						<div>{data.content}</div>
					</article>
				)}
				{showDelete && <button onClick={click}>Delete</button>}
			</div>
		</>
	);
}

export default Blogdetails;
