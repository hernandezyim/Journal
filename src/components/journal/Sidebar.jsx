import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { startmiddlewareLogout } from "../../actions/auth";

export const Sidebar = ({ handleAddNewNote }) => {
  const dispatch = useDispatch();

  const { displayName } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(startmiddlewareLogout());

  return (
    <div className="notes__sideBar vh-100 bg-dark text-light p-4">
      <div className="d-flex align-items-center justify-content-around">
        <div className="h5 mt-2 w-100 d-flex  align-items-center">
          <i className="far fa-address-card fa-2x" />
          <span className="ms-3">{displayName}</span>
          <div className="d-flex justify-content-end w-100 ">
            <i
              onClick={handleLogout}
              className="fas fa-sign-out-alt fa-2x text-danger pointer"
            ></i>
          </div>
        </div>
      </div>
      <div
        className="journal__new-entry text-center mt-5 pointer "
        onClick={handleAddNewNote}
      >
        <i className="far fa-plus-square mb-5 fa-8x" />
      </div>
      <JournalEntries />
    </div>
  );
};
