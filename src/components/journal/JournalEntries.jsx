import { JournalEntry } from "./JournalEntry";
import { useSelector } from "react-redux";

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  return (
    <div >
      {notes.map((note) => (
        <JournalEntry key={note.id} note={note} />
      ))}
    </div>
  );
};
