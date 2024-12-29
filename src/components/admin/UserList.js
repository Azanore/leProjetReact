import { useSelector } from "react-redux";
import UserDelete from "./UserDelete";

function UserList({
  userData: { id, photo, nom, prenom, Pays, admin },
  fetchData,
  onModifyClick,
  onDetailsClick, // Nouvelle prop pour gérer le clic sur "Détails"
  setActiveSection,
  setSelectedUserId,
}) {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <tr className={id === userData.id && `table-${userData.couleur} border-bottom-0 border-top-0 border-2  border-${userData.couleur}`}>
      <td>
        <img
          src={photo}
          alt="Profil"
          className="rounded"
          style={{ maxWidth: "48px" }} // Correctement écrit 'style' et ajout du height 'auto' pour conserver le ratio
        />
      </td>
      <td>{nom}</td>
      <td>{prenom}</td>
      <td>{Pays}</td>
      <td className={admin && "fw-bold text-success"}>
        {admin ? "Admin" : "Utilisateur"}
      </td>
      <td className="text-center">
        <div className="d-flex justify-content-center gap-2">
          <button
            onClick={() => onModifyClick(id)}
            className="btn btn-success btn-sm"
            disabled={admin && id !== userData.id}
          >
            Modifier
          </button>
          <button
            onClick={() => onDetailsClick(id)}
            className="btn btn-outline-dark btn-sm"
          >
            Détails
          </button>
          <UserDelete
            userId={id}
            fetchData={fetchData}
            setSelectedUserId={setSelectedUserId}
            setActiveSection={setActiveSection}
            admin={admin}
          />
        </div>
      </td>
    </tr>
  );
}

export default UserList;
