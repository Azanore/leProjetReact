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
    <nav
      className="bg-light py-4 d-flex gap-0"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <button
        onClick={toggleMenu}
        className="btn btn-dark p-1 btn-sm rounded-0 rounded-end-2 "
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
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
          >
            Accueil
          </Link>
        </li>
        <li>
          <Link
            to="profile"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
          >
            Mon profil
          </Link>
        </li>
        <li>
          <Link
            to="appearance"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
          >
            Personnaliser l'apparence
          </Link>
        </li>
        <li>
          <Link
            to="password"
            className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
          >
            Changer mon mot de passe
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              to="users"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
            >
              Gestion des utilisateurs
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="users/new"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
            >
              Ajouter un utilisateur
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/new"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
            >
              Soumettre une demande
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li>
            <Link
              to="requests/user"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
            >
              Mes demandes
            </Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link
              to="requests/admin"
              className={`btn btn-dark text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`}
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
