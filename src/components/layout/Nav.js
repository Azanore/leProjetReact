import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Nav() {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData.admin;

  return (
    <nav className={`bg-dark shadow-sm pt-2`}>
      <ul className="list-unstyled d-flex justify-content-center gap-3 align-items-center mb-0">
        <li>
          <Link
            to="/dashboard"
            className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="profile"
            className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
          >
            Mon profil
          </Link>
        </li>
        <li>
          <Link
            to="appearance"
            className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
          >
            Personnaliser l'apparence
          </Link>
        </li>
        <li>
          <Link
            to="password"
            className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
          >
            Changer mon mot de passe
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              to="users"
              className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
            >
              Gestion des utilisateurs
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="users/new"
              className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
            >
              Ajouter un utilisateur
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/new"
              className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
            >
              Soumettre une demande
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/user"
              className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
            >
              Mes demandes
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="requests/admin"
              className={`btn btn-${userData.couleur} rounded-0 rounded-top-3 btn-sm fw-bold`}
            >
              Gestion des demandes
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
