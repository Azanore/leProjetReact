// actions/demandeActions.js
import axios from "axios";

export const deleteDemande = (userId, demandeId) => {
  return (dispatch, getState) => {
    const demandes = getState().auth.userData.demandes.filter(
      (demande) => demande.id !== demandeId
    );

    axios
      .put(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`, {
        demandes,
      })
      .then((response) => {
        console.log("La demande a été supprimée avec succès : ", response.data);

        dispatch({
          type: "DELETE_DEMANDE",
          payload: demandeId,
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression:", error);
      });
  };
};
// actions.js or a relevant file

export const addDemande = (newDemande, userData, userId) => {
  return (dispatch) => {
    // Perform the API request to update the user data
    axios
      .put(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`, {
        ...userData,
        demandes: [...userData.demandes, newDemande],
      })
      .then((response) => {
        // Dispatch an action to add the demande locally
        dispatch({ type: "ADD_DEMANDE", payload: newDemande });
        console.log(
          "Votre demande a été soumise avec succès :",
          response.data.demandes
        );
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de l'envoi de votre demande :",
          error
        );
      });
  };
};

export const changePassword = (userId, newPassword) => (dispatch) => {
  // Return the promise from the axios request
  return axios
    .put(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`, {
      MotDePasse: newPassword,
    })
    .then(() => {
      // Dispatch the success action after the request succeeds
      dispatch({
        type: "CHANGER_MOT_DE_PASSE",
        payload: newPassword,
      });

      // Log out the user (no need to navigate here)
      dispatch({ type: "LOGOUT" });
    })
    .catch((error) => {
      // Dispatch error if request fails
      console.error("Erreur lors du changement de mot de passe", error);
    });
};

// actions.js
export const changeColor = (newColor, userId) => {
  return (dispatch) => {
    return axios
      .put(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`, {
        couleur: newColor,
      })
      .then(() => {
        dispatch({ type: "CHANGERCOULEUR", payload: newColor });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Erreur lors de la mise à jour de la couleur.",
        });
        console.error("Erreur lors de la mise à jour de la couleur :", err);
        throw err; // Propagate error for handling in the component
      });
  };
};

// actions.js
export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios
      .delete(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`)
      .then(() => {
        dispatch({ type: "USER_DELETED", payload: userId });
      })
      .catch((error) => {
        dispatch({ type: "DELETE_USER_ERROR", payload: error });
        console.error("Error deleting user:", error);
      });
  };
};
// actions/authActions.js

export const loginUser = (identifiants) => (dispatch) => {
  return axios
    .get("https://675afd529ce247eb19354af3.mockapi.io/users")
    .then((response) => {
      const foundUser = response.data.find(
        (user) =>
          user.pseudo === identifiants.pseudo &&
          user.MotDePasse === identifiants.MotDePasse
      );

      if (foundUser) {
        dispatch({
          type: "LOGIN",
          payload: foundUser,
        });
      } else {
        throw new Error("Identifiants incorrects");
      }
    })
    .catch((error) => {
      throw new Error("Erreur de connexion au serveur. Veuillez réessayer.");
    });
};

// Action pour mettre à jour un utilisateur
export const updateUser = (userId, userData, loggedInUserId) => {
  return (dispatch) => {
    return axios
      .put(
        `https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`,
        userData
      )
      .then((response) => {
        // Si l'utilisateur connecté est celui qui est mis à jour
        if (userId === loggedInUserId) {
          dispatch({
            type: "UPDATE_USER",
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        dispatch({
          type: "UPDATE_USER_FAILURE",
          error: error.message,
        });
      });
  };
};
