import { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingScreen from "../ui/LoadingScreen";
import NotesScreen from "../notes/NotesScreen";
import useUi from "../../hooks/useUi";
import startGetNotes from "../../services/notes/startGetNotes";

export default function JournalScreen() {
  const { loading } = useUi();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetNotes());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="container-fluid p-0 ">
        <NotesScreen />
      </div>
    </>
  );
}
