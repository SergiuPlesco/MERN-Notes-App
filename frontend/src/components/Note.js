import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNote, deleteNote, updateNote } from "../redux/services/NoteServices";
import { singleNote, isLoading, error } from "../redux/reducers/NoteSlice";

const Note = () => {
	const { noteID } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const [isEdit, setIsEdit] = useState(false);
	const [updateCurrentNote, setUpdateCurrentNote] = useState({});

	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			const noteData = {
				token: localStorage.getItem("authToken"),
				noteID: noteID,
			};
			dispatch(getSingleNote(noteData));
		}
	}, [dispatch, noteID]);

	const notesIsLoading = useSelector(isLoading);
	const noteError = useSelector(error);
	const note = useSelector(singleNote);

	useEffect(() => {
		setUpdateCurrentNote({ ...note });
	}, [note]);

	const handleEdit = (e) => {
		const { name, value } = e.target;
		setUpdateCurrentNote({
			...updateCurrentNote,
			[name]: value,
		});
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		setIsEdit(false);
		setUpdateCurrentNote({ ...updateCurrentNote });
		const noteData = {
			token: localStorage.getItem("authToken"),
			newNote: updateCurrentNote,
		};
		dispatch(updateNote(noteData))
			.then((response) => {
				if (response.meta.requestStatus === "rejected") {
					throw Error(response.payload);
				} else if (response.meta.requestStatus === "fulfilled") {
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleDelete = (id) => {
		const noteData = {
			token: localStorage.getItem("authToken"),
			noteID: id,
		};
		dispatch(deleteNote(noteData))
			.then((response) => {
				if (response.meta.requestStatus === "rejected") {
					throw Error(response.payload);
				} else if (response.meta.requestStatus === "fulfilled") {
					history.push("/notes");
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<>
			{notesIsLoading && (
				<div className="spinner-border text-warning" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}
			{noteError && <div>{noteError}</div>}

			{note && (
				<div className="card bg-warning">
					{isEdit ? (
						<form>
							<div className="card-header text-dark">
								<input
									name="title"
									type="text"
									value={updateCurrentNote.title}
									onChange={handleEdit}
									className="form-control card-title bg-transparent text-dark border-0 fs-3 p-0"
								/>
							</div>
							<div className="card-body">
								<p className="card-text">
									<TextareaAutosize
										name="body"
										value={updateCurrentNote.body}
										onChange={handleEdit}
										className="textarea form-control bg-transparent border-0 fs-5 p-0 lh-0"
									></TextareaAutosize>
								</p>
								<div className="btn-controls">
									<button
										type="submit"
										onClick={handleUpdate}
										className="btn bg-success text-white"
									>
										Save
									</button>
									<button
										onClick={() => {
											if (isEdit) {
												setIsEdit(false);
												handleDelete(updateCurrentNote._id);
											}
										}}
										className="btn bg-dark text-white"
									>
										Delete
									</button>
								</div>
							</div>
						</form>
					) : (
						<>
							<div className="card-header">
								<p className="card-title fs-3">{updateCurrentNote.title}</p>
							</div>
							<div className="card-body">
								<p className="card-text fs-5">{updateCurrentNote.body}</p>
								<div className="btn-controls ">
									<button
										onClick={() => {
											setIsEdit(true);
										}}
										className="btn bg-light"
									>
										Edit
									</button>
									<button
										onClick={() => {
											handleDelete(updateCurrentNote._id);
										}}
										className="btn bg-dark text-white"
									>
										Delete
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Note;
