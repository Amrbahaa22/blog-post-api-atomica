import axios from "axios";
import { useEffect, useState } from "react";
import Bloglist from "./Bloglist";
import Navbar from "./Navbar";

function Home() {
	const [data, setData] = useState();
	const [err, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:8080/api/v1/posts/", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 200) {
					setData(res.data);
				} else {
					setError("you are not allowed to log in");
					console.log("🚀 ---------------------------------------------------------🚀");
					console.log("🚀 ~ file: Home.js ~ line 23 ~ .then ~ res.data", res);
					console.log("🚀 ---------------------------------------------------------🚀");
				}
			})
			.catch((e) => {
				setError(e.message);
				console.log("🚀 -----------------------------------------------🚀");
				console.log("🚀 ~ file: Home.js ~ line 27 ~ useEffect ~ e", e);
				console.log("🚀 -----------------------------------------------🚀");
			});

		setLoading(false);
	}, []);

	return (
		<>
			<Navbar className="home" />
			<div className="home">
				{loading && <h2>Loading data...</h2>}
				{err && <div>{err}</div>}
				{data && <Bloglist blogs={data} />}
			</div>
		</>
	);
}

export default Home;
