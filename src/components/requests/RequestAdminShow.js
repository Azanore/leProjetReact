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
    const userRequests = demandes.filter((demande) => {
      return demande.id_user === id_user;
    });
    const newDemandes = userRequests.map((requete) => {
      if (requete.id === id) {
        return {
          ...requete,
          status: ev.target.value,
          last_modif: new Date().toLocaleString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // 24-hour format
          }),
          modified_by: userAuthData.nom,
        };
      } else return requete;
    });
    axios
      .put("https://675afd529ce247eb19354af3.mockapi.io/users/" + id_user, {
        demandes: newDemandes,
      })
      .then(() => {
        fetchData();
      });
  };

  return (
    <div className="flex-grow-1 pt-5 px-3">
      <table className="table table-striped table-borderless caption-top table-hover border-bottom mb-0">
        <caption className="h2 p-0 mb-4">
          Tableau de bord des demandes (Admin)
        </caption>
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date d'ajout</th>
            <th>Admin chargé</th> {/* Nouvelle colonne admin */}
            <th>Date de modification</th>{" "}
            {/* Nouvelle colonne date de modification */}
          </tr>
        </thead>
        <tbody>
          {/* Vérifie si le tableau des demandes est vide */}
          {demandes.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">
                Aucune demande à afficher
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
                          ? "text-warning"
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
                  <td>{demande.modified_by}</td> {/* Colonne admin */}
                  <td>{demande.last_modif}</td>{" "}
                  {/* Colonne date de modification */}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestAdminShow;
