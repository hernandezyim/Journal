import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startCloseNote } from "../../actions/notes";

export const JournalEntry = ({ note }) => {
  const { activeNote } = useSelector((state) => state.notes);

  const { title, date, url } = note;

  const dispatch = useDispatch();

  const momentDate = moment(date);

  const handleEntryClick = () => {
    if (activeNote) dispatch(startCloseNote());
    dispatch(setActiveNote(note));
  };
  return (
    <div
      className="animate__animated animate__fadeIn pointer bg-light text-dark rounded p-0 mb-2 d-flex justify-content-between align-items-center p-2"
      onClick={handleEntryClick}
    >
      {url && <img src={url} alt="img" width={90} />}
      
        <p className=" fw-bold">
          <strong>{title}</strong>
        </p>
      
      <div className="text-end">
        <span className="fw-bold">{momentDate.format("dddd")}</span>
        <h4 className="fw-bold">{momentDate.format("Do")}</h4>
      </div>
    </div>
  );
};
