import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveNote,
  startCloseNote,
  startDeletingNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { useForm } from "../../hooks/useForm";

export const NotesEdit = () => {
  const dispatch = useDispatch();

  const { activeNote } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(activeNote);

  const { body, title, url, id } = formValues;

  const activeId = useRef(id);
  const InputRef = useRef();
  const firstRender = useRef(false);

  const handleSaveNote = () => dispatch(startSaveNote());

  const handleClickUpdateFile = () => InputRef.current.click();

  const handleInputChangeFile = ({ target }) =>
    target.files[0] && dispatch(startUploading(target.files[0]));

  const handleDeleteNote = () => {
    dispatch(startDeletingNote(id));
  };

  const handleCloseNote = () => {
    dispatch(startCloseNote());
  };

  useEffect(() => {
    if (!firstRender.current) return;
    if (activeId.current !== activeNote.id) {
      reset(activeNote);
      activeId.current = activeNote.id;
    } else if (activeId.current === activeNote.id && url !== activeNote.url) {
      reset(activeNote);
    }
  }, [activeNote, reset, activeId, url]);

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
          className="far fa-window-close text-danger fa-5x pointer"
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
        
          {url && <img className="p-0 m-0" src={url} alt="img" width={100} height={100}/>}
        

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
              className="far fa-trash-alt text-danger fa-5x pointer"
            ></i>
          )}
          <i
            onClick={handleClickUpdateFile}
            className="far fa-images text-dark fa-5x mx-3 pointer"
          ></i>
          <i
            onClick={handleSaveNote}
            className="far fa-save text-success fa-5x pointer"
          ></i>
        </div>
      </div>
    </div>
  );
};
