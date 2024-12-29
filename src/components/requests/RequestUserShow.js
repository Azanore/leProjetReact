import { useSelector, useDispatch } from "react-redux";
import RequestUserDelete from "./RequestUserDelete";
import { deleteDemande } from "../../redux/actions";

function RequestUserShow() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData.id);
  const demandes = useSelector((state) => state.auth.userData.demandes);

  const handleDelete = (demandeId) => {
    dispatch(deleteDemande(userId, demandeId));
  };

  return (
    <div className="px-3 pt-5">
      <h2 className="mb-4">Mes demandes </h2>
      <table className="table table-striped table-borderless border-bottom table-hover caption-top">
        <thead className="table-dark">
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demandes.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                Aucune demande à afficher
              </td>
            </tr>
          ) : (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td
                  className={
                    demande.status === "en_attente"
                      ? "text-warning"
                      : demande.status === "approuvé"
                      ? "text-success"
                      : demande.status === "rejeté"
                      ? "text-danger"
                      : ""
                  }
                >
                  {demande.status}
                </td>
                <td>{demande.date}</td>
                <td>
                  <RequestUserDelete
                    demandeId={demande.id}
                    status={demande.status}
                    onDelete={handleDelete}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestUserShow;
