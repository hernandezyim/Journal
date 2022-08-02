import JournalEntry from "./JournalEntry";
import useNotes from "../../hooks/useNotes";

export default function JournalEntries() {
  const { notes } = useNotes();
  return (
    <div>
      {notes.map((note) => (
        <JournalEntry key={note.id} note={note} />
      ))}
    </div>
  );
}
