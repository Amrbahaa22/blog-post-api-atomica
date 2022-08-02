import { useState, useEffect } from "react";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [err, setErr] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(url)
			.then((res) => {
				
				if (!res.ok) {
					// for check the response is full with data or not
					throw Error("There is no data (couldnt fetch the data)");
				}
				return res.json();
			})

			.then((data) => {
				setLoading(false);
				setData(data);
				setErr(null);
			})

			.catch((error) => {
				setLoading(false);
				setData(null);
				setErr(error.message);
			}); // for  connection failed
	}, [url]);

	return { data, err, loading };
}

export default useFetch;
