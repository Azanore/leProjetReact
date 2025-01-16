import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function Aside() {
  const [isOpen, setIsOpen] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData.admin;

  const toggleMenu = () => setIsOpen(!isOpen);

  const getButtonClass = (isActive) =>
    isActive
      ? `btn btn-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
      : `btn text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium text-start`;

  const NavLinkItem = ({ to, children }) => (
      <NavLink
        to={to}
        end
        className={({ isActive }) => getButtonClass(isActive)}
      >
        {children}
      </NavLink>
  );

  return (
    <div
      className={`bg-light pt-3 pb-5 rounded d-xl-block d-none ${
        isOpen ? "col-2" : ""
      }`}
    >
      <nav
        className="bg-white rounded-end-4 shadow-sm d-flex gap-0"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={toggleMenu}
          className={`btn btn-${userData.couleur} p-1 btn-sm rounded-0 rounded-end-2`}
          aria-expanded={isOpen}
        ></button>
        <ul
          className={`list-unstyled d-flex flex-column gap-2 mt-4 pe-2 w-100 ${
            isOpen ? "" : "d-none"
          }`}
        >
          <NavLinkItem to="/dashboard">Accueil</NavLinkItem>
          <NavLinkItem to="profile">Mon Profil</NavLinkItem>
          <NavLinkItem to="appearance">Thème</NavLinkItem>
          <NavLinkItem to="password">Mot de passe</NavLinkItem>
          <NavLinkItem to="text">Police</NavLinkItem>
          {isAdmin && (
            <>
              <NavLinkItem to="users">Liste utilisateurs</NavLinkItem>
              <NavLinkItem to="users/new">Ajouter utilisateur</NavLinkItem>
              <NavLinkItem to="requests/admin">Voir demandes</NavLinkItem>
            </>
          )}
          {!isAdmin && (
            <>
              <NavLinkItem to="requests/new">Créer demande</NavLinkItem>
              <NavLinkItem to="requests/user">Mes demandes</NavLinkItem>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
