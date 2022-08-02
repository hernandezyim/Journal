import { useSelector } from "react-redux";

const useNotes = () => useSelector((state) => state.notes);

export default useNotes;
