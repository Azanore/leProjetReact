import { useEffect, useState } from "react";
import axios from "axios";

function UserDetails({ userId }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails utilisateur:",
          error
        );
      });
  }, [userId]);

  if (!userDetails) {
    return null;
  }

  return (
    <div className=" pe-3 pt-5">
      <h2 className="mb-4 text-center">Profil utilisateur</h2>
      <div
        className="mb-3 d-flex justify-content-center align-items-center "
        style={{ height: "150px" }}
      >
        <img
          src={userDetails.photo}
          alt="Profil"
          className="img-thumbnail"
          width="150"
        />
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Nom :</strong> {userDetails.nom}
        </li>
        <li className="list-group-item">
          <strong>Prénom :</strong> {userDetails.prenom}
        </li>
        <li className="list-group-item">
          <strong>Email :</strong> {userDetails.email}
        </li>
        <li className="list-group-item">
          <strong>Âge :</strong> {userDetails.age}
        </li>
        <li className="list-group-item">
          <strong>Pseudo :</strong> {userDetails.pseudo}
        </li>
        <li className="list-group-item">
          <strong>Devise :</strong> {userDetails.Devise}
        </li>
        <li className="list-group-item">
          <strong>Pays :</strong> {userDetails.Pays}
        </li>
        <li className="list-group-item">
          <strong>Couleur :</strong> {userDetails.couleur}
        </li>
      </ul>
    </div>
  );
}

export default UserDetails;
