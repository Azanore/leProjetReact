import { useSelector } from "react-redux";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const couleurMap = {
    info: "Bleu clair",
    success: "Vert",
    danger: "Rouge",
    secondary: "Gris",
    warning: "Ambre",
    primary: "Bleu",
  };
  return (
    <div className="px-3 pt-5 col-4">
      <h2 className="mb-4">Détails de l'utilisateur</h2>
      <div
        className="mb-3 d-flex justify-content-center align-items-center "
        style={{ height: "150px" }}
      >
        <img
          src={userData.photo}
          alt="Profil"
          className="img-thumbnail"
          width="150"
        />
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Nom :</strong> {userData.nom}
        </li>
        <li className="list-group-item">
          <strong>Prénom :</strong> {userData.prenom}
        </li>
        <li className="list-group-item">
          <strong>Email :</strong> {userData.email}
        </li>
        <li className="list-group-item">
          <strong>Âge :</strong> {userData.age}
        </li>
        <li className="list-group-item">
          <strong>Pseudo :</strong> {userData.pseudo}
        </li>
        <li className="list-group-item">
          <strong>Devise :</strong> {userData.Devise}
        </li>
        <li className="list-group-item">
          <strong>Pays :</strong> {userData.Pays}
        </li>
        <li className="list-group-item">
          <strong>Couleur :</strong>{" "}
          {couleurMap[userData.couleur] || userData.couleur}
        </li>
      </ul>
    </div>
  );
}
export default Profile;
