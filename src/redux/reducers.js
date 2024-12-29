import { combineReducers } from "redux";
import {produce} from "immer";

// Constants for action types
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const CHANGERCOULEUR = "CHANGERCOULEUR";
const ADD_DEMANDE = "ADD_DEMANDE";
const DELETE_DEMANDE = "DELETE_DEMANDE"; // Nouvelle action pour supprimer la demande
const CHANGER_MOT_DE_PASSE = "CHANGER_MOT_DE_PASSE";
const UPDATE_USER = "UPDATE_USER";

const authReducer = (state = { userData: "" }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.userData = action.payload;
        break;
      case LOGOUT:
        draft.userData = "";
        break;
      case UPDATE_USER:
        draft.userData = action.payload;
        break;
      case CHANGERCOULEUR:
        draft.userData.couleur = action.payload;
        break;
      case ADD_DEMANDE:
        draft.userData.demandes.push(action.payload); // Ajouter la nouvelle demande
        break;
      case CHANGER_MOT_DE_PASSE:
        draft.userData.MotDePasse = action.payload;
        break;
      case DELETE_DEMANDE:
        draft.userData.demandes = draft.userData.demandes.filter(
          (demande) => demande.id !== action.payload // Supprimer la demande par ID
        );
        break;
      default:
        break;
    }
  });
};

const rootReducer = combineReducers({ auth: authReducer });

export default rootReducer;
