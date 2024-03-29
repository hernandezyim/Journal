import { useDispatch } from "react-redux";
import { signOut } from "../../actions/auth";
import JournalEntries from "./JournalEntries";
import useAuth from "../../hooks/useAuth";

export default function Sidebar({ handleAddNewNote }) {
  const dispatch = useDispatch();

  const { name } = useAuth();

  const handleLogout = () => dispatch(signOut());

  return (
    <div className="notes__sideBar vh-100 bg-dark text-light p-4">
      <div className="d-flex align-items-center justify-content-around">
        <div className="h5 mt-2 w-100 d-flex  align-items-center">
          <i className="far fa-address-card fa-2x" />
          <span className="ms-3">{name}</span>
          <div className="d-flex justify-content-end w-100 ">
            <i
              onClick={handleLogout}
              className="fas fa-sign-out-alt fa-2x text-danger pointer"
            ></i>
          </div>
        </div>
      </div>
      <div
        className="journal__new-entry text-center mt-5 pointer d-flex flex-column mb-5"
        onClick={handleAddNewNote}
      >
        <i className="far fa-calendar-plus mb-2 fa-8x" />
        <span>Agregar nueva nota</span>
      </div>
      <JournalEntries />
    </div>
  );
}
