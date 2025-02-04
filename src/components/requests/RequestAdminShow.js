import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RequestAdminShow() {
  const [demandes, setDemandes] = useState([]);
  const userAuthData = useSelector((state) => state.auth.userData);

  const fetchData = () => {
    axios
      .get("https://675afd529ce247eb19354af3.mockapi.io/users")
      .then((response) => {
        const allDemandes = response.data.flatMap((user) => user.demandes);
        setDemandes(allDemandes);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des demandes :", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (ev, id, id_user) => {
    const newStatus = ev.target.value;
    const lastModif = new Date().toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    // Vérifier d'abord si la demande existe avant de modifier l'état local
    axios
      .get(`https://675afd529ce247eb19354af3.mockapi.io/users/${id_user}`)
      .then((res) => {
        if (!res.data.demandes.some((req) => req.id === id)) {
          alert("Cette demande a été supprimée ou n'existe plus.");
          fetchData();
          return;
        }

        // Mise à jour locale des demandes seulement si la demande existe encore
        setDemandes((prevDemandes) =>
          prevDemandes.map((demande) =>
            demande.id === id
              ? {
                  ...demande,
                  status: newStatus,
                  last_modif: lastModif,
                  modified_by: userAuthData.pseudo,
                }
              : demande
          )
        );

        // Mettre à jour l'API
        const updatedDemandes = res.data.demandes.map((requete) =>
          requete.id === id
            ? {
                ...requete,
                status: newStatus,
                last_modif: lastModif,
                modified_by: userAuthData.pseudo,
              }
            : requete
        );

        return axios.put(
          `https://675afd529ce247eb19354af3.mockapi.io/users/${id_user}`,
          { demandes: updatedDemandes }
        );
      })
      .then(() => fetchData())
      .catch((error) =>
        console.error("Erreur lors de la mise à jour :", error)
      );
  };

  return (
    <div className="flex-grow-1 pt-5 px-3">
      <div className="table-responsive">
        <table className="table table-striped table-borderless caption-top table-hover mb-0">
          <caption className="h2 p-0 mb-4">
            Tableau de bord des demandes
          </caption>
          <thead>
            <tr>
              <th>Id</th>
              <th>Titre</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date d'ajout</th>
              <th>Admin chargé</th>
              <th>Date de modification</th>
            </tr>
          </thead>
          <tbody>
            {demandes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  <i className="bi bi-inbox"></i> Aucune demande trouvée
                </td>
              </tr>
            ) : (
              demandes.map((demande) => {
                return (
                  <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td>{demande.titre}</td>
                    <td>{demande.description}</td>
                    <td>
                      <select
                        onChange={(ev) =>
                          handleSelectChange(ev, demande.id, demande.id_user)
                        }
                        value={demande.status}
                        className={`form-select form-select-sm ${
                          demande.status === "en_attente"
                            ? "text-secondary"
                            : demande.status === "approuvé"
                            ? "text-success"
                            : demande.status === "rejeté"
                            ? "text-danger"
                            : ""
                        }`}
                      >
                        <option className="text-dark" value="en_attente">
                          En attente
                        </option>
                        <option className="text-dark" value="approuvé">
                          Approuvé
                        </option>
                        <option className="text-dark" value="rejeté">
                          Rejeté
                        </option>
                      </select>
                    </td>
                    <td>{demande.date}</td>
                    <td>{demande.modified_by}</td>
                    <td>{demande.last_modif}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestAdminShow;
