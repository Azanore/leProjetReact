import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDemande } from "../../redux/actions";

const RequestUserAdd = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
  });

  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success message

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.id; // The connected user's ID
  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleIdentifiants = (ev) => {
    const { name, value, type, checked } = ev.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(""); // Reset error on input change
    setSuccess(""); // Reset success message on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both fields are filled
    if (!formData.titre || !formData.description) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    // Reset error message
    setError("");

    // Generate a unique ID based on the current time
    const id = "ID" + new Date().getTime(); // Example: ID1671847029345

    // Create the new demande object
    const newDemande = {
      id: id,
      titre: formData.titre,
      description: formData.description,
      status: "en_attente",
      date: new Date().toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
      }),
      id_user: userId,
    };

    // Dispatch the Thunk action to handle the async operation
    dispatch(addDemande(newDemande, userData, userId));

    // Set success message
    setSuccess("Votre demande a été soumise avec succès.");

    // Reset the form data
    setFormData({
      titre: "",
      description: "",
    });
  };

  return (
    <div className="px-3 container pt-5">
      <h2 className="mb-4 text-center">Soumettre une demande</h2>
      <div className="row justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3 col-12 col-md-8 col-lg-5"
        >
          <div className="form-floating">
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleIdentifiants}
              className="form-control  border border-light-subtle shadow-sm"
              placeholder="Titre de la demande"
            />
            <label htmlFor="titre">Titre de la demande</label>
          </div>

          <div className="form-floating">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleIdentifiants}
              className="form-control  border border-light-subtle shadow-sm"
              placeholder="Description de la demande"
              style={{ height: "8rem", resize: "none" }}
            ></textarea>
            <label htmlFor="description">Description de la demande</label>
          </div>

          {error && <div className="alert alert-danger mb-0">{error}</div>}
          {success && <div className="alert alert-success mb-0">{success}</div>}

          <button type="submit" className={`btn btn-${userData.couleur}`}>
            Soumettre la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestUserAdd;
