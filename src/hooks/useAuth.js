import { useSelector } from "react-redux";

const useAuth = () => useSelector((state) => state.auth);

export default useAuth;
