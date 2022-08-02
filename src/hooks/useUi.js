import { useSelector } from "react-redux";

const useUi = () => useSelector((state) => state.ui);

export default useUi;
