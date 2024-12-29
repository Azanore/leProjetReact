import { createStore, applyMiddleware, compose } from "redux";
import {thunk} from "redux-thunk"; // Assurez-vous d'importer correctement `thunk`
import rootReducer from "./reducers";

// Créer le store avec applyMiddleware et Redux DevTools
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk), // Applique le middleware thunk
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f // Vérifie si Redux DevTools est disponible
  )
);

export default store;
