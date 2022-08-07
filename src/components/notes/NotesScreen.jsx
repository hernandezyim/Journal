import { useDispatch } from "react-redux";
import { setActiveNote } from "../../actions/notes";
import { useMediaQuery } from "react-responsive";
import NothingSelected from "../journal/NothingSelected";
import Sidebar from "../journal/Sidebar";
import NotesEdit from "./NotesEdit";
import useNotes from "../../hooks/useNotes";

export default function NotesScreen() {
  const dispatch = useDispatch();
  const { activeNote } = useNotes();

  const handleAddNewNote = () => {
    if (activeNote) return;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    dispatch(setActiveNote(newNote));
  };
  const matches = useMediaQuery({ minWidth: 768 });

  return (
    <div className="row vh-100 bg-light me-0 mt-0">
      {matches && (
        <div className="col-md-4 p-0">
          <Sidebar handleAddNewNote={handleAddNewNote} />
        </div>
      )}
      <div className="col-md-8 p-0 bg-primary">
        {activeNote ? (
          <NotesEdit />
        ) : matches ? (
          <NothingSelected handleAddNewNote={handleAddNewNote} />
        ) : (
          <Sidebar handleAddNewNote={handleAddNewNote} />
        )}
      </div>
    </div>
  );
}
