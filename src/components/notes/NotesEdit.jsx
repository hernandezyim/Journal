import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote, closeNote, loadImage } from "../../actions/notes";
import useForm from "../../hooks/useForm";
import useNotes from "../../hooks/useNotes";
import startDeleteNote from "../../services/notes/startDeleteNote";
import startSaveNote from "../../services/notes/startSaveNote";

export default function NotesEdit() {
  const dispatch = useDispatch();

  const { activeNote } = useNotes();

  const [formValues, handleInputChange, reset] = useForm(activeNote);

  const { body, title, photo_url, id } = formValues;

  const activeId = useRef(id);
  const InputRef = useRef();
  const firstRender = useRef(false);

  const handleSaveNote = () => dispatch(startSaveNote());

  const handleClickUpdateFile = () => InputRef.current.click();

  const handleInputChangeFile = ({ target }) =>
    target.files[0] && dispatch(loadImage(target.files[0]));

  const handleDeleteNote = () => {
    dispatch(startDeleteNote(id));
  };

  const handleCloseNote = () => {
    dispatch(closeNote());
  };

  useEffect(() => {
    if (!firstRender.current) return;
    if (
      activeId.current === activeNote.id &&
      photo_url === activeNote.photo_url
    )
      return;

    reset(activeNote);

    if (activeId.current !== activeNote.id) {
      activeId.current = activeNote.id;
    }
  }, [activeNote, reset, activeId, photo_url]);

  useEffect(() => {
    firstRender.current
      ? dispatch(setActiveNote(formValues))
      : (firstRender.current = true);
  }, [dispatch, formValues]);
  return (
    <div className="pt-5 px-5 d-flex flex-column ">
      <div className="text-end">
        <i
          onClick={handleCloseNote}
          className="far fa-window-close text-danger fa-5x pointer animate__animated animate__pulse animate__slow animate__infinite"
        ></i>
      </div>
      <input
        className="notes__title-input rounded-3 mt-2"
        placeholder="En que piensas... ?"
        name="title"
        type="text"
        onChange={handleInputChange}
        value={title}
      />
      <textarea
        className="notes__textarea rounded-3 fw-bold"
        placeholder="Escribe algo... lo que sea :)"
        name="body"
        cols="30"
        rows="10"
        onChange={handleInputChange}
        value={body}
      ></textarea>

      <div className="d-flex justify-content-between mt-5">
        {(photo_url || activeNote.photo_temp) && (
          <img
            className="p-0 m-0 rounded"
            src={photo_url || activeNote.photo_temp}
            alt="img"
            width={100}
            height={100}
          />
        )}

        <input
          ref={InputRef}
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleInputChangeFile}
        />

        <div className="text-end w-100">
          {activeNote.id && (
            <i
              onClick={handleDeleteNote}
              className="far fa-trash-alt text-danger fa-5x pointer animate__animated animate__pulse animate__slow animate__delay-2s animate__infinite"
            ></i>
          )}
          <i
            onClick={handleClickUpdateFile}
            className="far fa-images text-dark fa-5x mx-3 pointer animate__animated animate__pulse animate__slow animate__delay-1s animate__infinite"
          ></i>
          <i
            onClick={handleSaveNote}
            className="far fa-save text-success fa-5x pointer animate__animated animate__pulse animate__slow  animate__infinite"
          ></i>
        </div>
      </div>
    </div>
  );
}
