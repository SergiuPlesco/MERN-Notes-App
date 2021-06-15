import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { saveNote } from "../redux/services/NoteServices";

const AddNote = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isContentEmpty, setIsContentEmpty] = useState(false);
	const [error, setError] = useState("");
	const [note, setNote] = useState({
		title: "",
		body: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNote({
			...note,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const noteData = {
			token: localStorage.getItem("authToken"),
			newNote: note,
		};

		if (note.title !== "") {
			dispatch(saveNote(noteData))
				.then((response) => {
					if (response.meta.requestStatus === "rejected") {
						throw Error(response.payload);
					} else if (response.meta.requestStatus === "fulfilled") {
						setIsContentEmpty(false);
						history.push("/notes");
					}
				})
				.catch((error) => {
					setError(error.message);
					setTimeout(() => {
						setError("");
					}, 5000);
				});
		} else {
			setIsContentEmpty(true);
		}

		setTimeout(() => {
			setIsContentEmpty(false);
		}, 5000);
	};
	return (
		<div>
			{error && <div>{error}, log in or register.</div>}
			{isContentEmpty && <div>Content cannot be empty!</div>}
			<div className="card bg-warning">
				<form onSubmit={handleSubmit}>
					<div className="card-header">
						<input
							id="title"
							name="title"
							type="text"
							value={note.title}
							onChange={handleChange}
							placeholder="Enter Title"
							className="form-control card-title bg-transparent border-0 fs-3 p-0"
						/>
					</div>
					<div className="card-body">
						<p className="card-text">
							<TextareaAutosize
								id="body"
								name="body"
								value={note.body}
								onChange={handleChange}
								placeholder="Enter body"
								className="textarea form-control bg-transparent border-0 fs-5 p-0 lh-0"
							></TextareaAutosize>
						</p>
						<div className="btn-controls">
							<button type="submit" className="btn btn-success">
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddNote;
