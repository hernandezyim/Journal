import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote, closeNote } from "../../actions/notes";
import useForm from "../../hooks/useForm";
import useNotes from "../../hooks/useNotes";
import startDeleteNote from "../../services/notes/startDeleteNote";
import startSaveNote from "../../services/notes/startSaveNote";

export default function NotesEdit() {
  const dispatch = useDispatch();

  const { activeNote } = useNotes();

  const [values, handleInputChange] = useForm(activeNote);

  const { body, title, photo_url, id } = values;

  const fileInput = useRef();
  const firstRender = useRef(false);

  const handleSaveNote = () => dispatch(startSaveNote());

  const handleClickUpdateFile = () => fileInput.current.click();

  const handleInputChangeFile = ({ target }) => {
    const [file] = target.files;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ({ target }) => {
      activeNote.file = file;

      handleInputChange({
        target: {
          name: "photo_url",
          value: target.result,
        },
      });
    };
  };

  const handleDeleteNote = () => dispatch(startDeleteNote(id));

  const handleCloseNote = () => dispatch(closeNote());

  useEffect(() => {
    firstRender.current
      ? dispatch(setActiveNote(values))
      : (firstRender.current = true);
  }, [dispatch, values]);
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
        {photo_url && (
          <img
            className="p-0 m-0 rounded"
            src={photo_url}
            alt="img"
            width={100}
            height={100}
          />
        )}

        <input
          ref={fileInput}
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
