import { useDispatch } from "react-redux";
import { setActiveNote, closeNote } from "../../actions/notes";
import moment from "moment";
import useNotes from "../../hooks/useNotes";

export default function JournalEntry({ note }) {
  const { activeNote } = useNotes();

  const { title, date, photo_url } = note;

  const dispatch = useDispatch();

  const momentDate = moment(Number(date));

  const handleEntryClick = () => {
    if (activeNote) dispatch(closeNote());
    dispatch(setActiveNote(note));
  };
  return (
    <div
      className="animate__animated animate__fadeIn pointer bg-light text-dark rounded p-0 mb-2 d-flex justify-content-between align-items-center p-2"
      onClick={handleEntryClick}
    >
      {photo_url && (
        <img src={photo_url} alt="img" width={90} className="me-2" />
      )}

      <p className="fw-bold">
        <strong>{title}</strong>
      </p>

      <div className="text-end">
        <span className="fw-bold">{momentDate.format("dddd")}</span>
        <h4 className="fw-bold">{momentDate.format("Do")}</h4>
      </div>
    </div>
  );
}
