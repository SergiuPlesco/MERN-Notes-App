import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Services
import { fetchAllNotes, deleteNote } from "../redux/services/NoteServices";
// Selector
import { allNotes, isLoading, error } from "../redux/reducers/NoteSlice";
import "./NotesList.css";

const NoteList = () => {
	const history = useHistory();
	const [isNoteDeleted, setIsNoteDeleted] = useState(false);
	const [zeroNotesMessage, setZeroNotesMessage] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem("authToken")) {
			dispatch(fetchAllNotes(localStorage.getItem("authToken")));
		} else {
			history.push("/login");
		}
	}, [dispatch, isNoteDeleted, history]);

	const notes = useSelector(allNotes);
	const notesError = useSelector(error);
	const notesIsLoading = useSelector(isLoading);

	useEffect(() => {
		if (notes === undefined || notes.length === 0) {
			setZeroNotesMessage(true);
		} else {
			setZeroNotesMessage(false);
		}
	}, [notes]);

	const handleDelete = (id) => {
		const noteData = {
			token: localStorage.getItem("authToken"),
			noteID: id,
		};
		dispatch(deleteNote(noteData))
			.then(() => {
				setIsNoteDeleted(true);
			})
			.catch((error) => {
				console.log(error);
			});
		setIsNoteDeleted(false);
	};

	return (
		<>
			{notesIsLoading && (
				<div className="spinner-border text-warning" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}
			{notesError && <div>{notesError}</div>}
			{!notesIsLoading && !notesError && zeroNotesMessage && (
				<div>You don't have any notes yet, start adding now.</div>
			)}
			{notes && (
				<div className="notes-grid">
					{notes.map((note) => {
						return (
							<div className="card bg-warning mb-3" key={note._id}>
								<div className="card-header">
									<h3 className="card-title">{note.title}</h3>
									<p className="card-title">
										{new Date(note.createdAt).toLocaleDateString(undefined, {
											day: "numeric",
											month: "long",
											year: "numeric",
										})}
									</p>
								</div>
								<div className="card-body">
									<p className="card-text notes-list">{note.body}</p>
									<div className="btn-controls">
										<Link to={`/notes/${note._id}`} className="btn bg-light">
											View Note
										</Link>
										<button
											onClick={() => {
												handleDelete(note._id);
											}}
											className="btn bg-dark text-white"
										>
											Delete Note
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default NoteList;
