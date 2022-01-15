import { useSelector } from "react-redux";
import { LoadingScreen } from "../ui/LoadingScreen";
import { NotesScreen } from "../notes/NotesScreen";

export const JournalScreen = () => {
  const { loading } = useSelector((state) => state.ui);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="container-fluid p-0 ">
        <NotesScreen />
      </div>
    </>
  );
};
