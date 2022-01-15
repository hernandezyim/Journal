import { Provider } from "react-redux";
import { RootRouter } from "./routers/RootRouter";
import { store } from "./store/store";

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
};
