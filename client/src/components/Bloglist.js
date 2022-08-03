import React from "react";
import { Link } from "react-router-dom";

function Bloglist(props) {
	return (
		<div>
			{props.blogs.data.map((blog) => (
				<div className="blog-preview" key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>
						<h2>{blog.title}</h2>
					</Link>
				</div>
			))}
		</div>
	);
}

export default Bloglist;
