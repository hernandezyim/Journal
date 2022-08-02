import { Provider } from "react-redux";

import RootRouter from "./routers/RootRouter";
import store from "./store/store";

export default function JournalApp() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
}
