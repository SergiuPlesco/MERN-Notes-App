import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div>
			<h1>Page not found</h1>
			<div>
				Go to <Link to="/">Home</Link>
			</div>
		</div>
	);
};

export default PageNotFound;
