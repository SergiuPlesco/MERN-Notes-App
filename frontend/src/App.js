import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import PageNotFound from "./components/PageNotFound";
import NotesList from "./components/NotesList";
import Note from "./components/Note";
import AddNote from "./components/AddNote";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";

function App() {
	return (
		<Router>
			<Navigation />

			<div className="container mt-3">
				<Switch>
					<Route exact path="/notes">
						<NotesList />
					</Route>
					<Route exact path="/notes/:noteID">
						<Note />
					</Route>
					<Route exact path="/add-note">
						<AddNote />
					</Route>
					<Route exact path="/logout">
						<Redirect exact to="/login" />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/forgotpassword">
						<ForgotPassword />
					</Route>
					<Route exact path="/resetpassword/:resetToken">
						<ResetPassword />
					</Route>
					<Route path="*">
						<PageNotFound />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
