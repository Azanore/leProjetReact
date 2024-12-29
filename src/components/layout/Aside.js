import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function Aside() {
  const [isOpen, setIsOpen] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData.admin;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-light py-4 shadow-sm d-flex gap-0">
      <button
        onClick={toggleMenu}
        className="btn btn-dark fw-bold btn-sm rounded-0 rounded-end-2 "
        aria-expanded={isOpen}
      ></button>
      <ul
        className={`list-unstyled d-flex flex-column gap-2 mt-4  ${
          isOpen ? "" : "d-none"
        }`}
      >
        <li>
          <Link
            to="/dashboard"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="profile"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
          >
            Mon profil
          </Link>
        </li>
        <li>
          <Link
            to="appearance"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
          >
            Personnaliser l'apparence
          </Link>
        </li>
        <li>
          <Link
            to="password"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
          >
            Changer mon mot de passe
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              to="users"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
            >
              Gestion des utilisateurs
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="users/new"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
            >
              Ajouter un utilisateur
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/new"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
            >
              Soumettre une demande
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/user"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
            >
              Mes demandes
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="requests/admin"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-bold`}
            >
              Gestion des demandes
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Aside;
