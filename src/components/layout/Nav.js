import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Nav() {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData.admin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    await navigate("", { replace: true });
    dispatch({ type: "LOGOUT" });
  };
  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        isActive
          ? `btn btn-${userData.couleur} btn-sm fw-medium rounded-0`
          : `btn bg-white shadow-sm text-${userData.couleur} btn-sm fw-medium rounded-0`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light py-3 d-lg-none"
        style={{ position: "sticky", top: "0px", zIndex: 1000 }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileNavbar"
            aria-controls="mobileNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mt-3" id="mobileNavbar">
            <ul className="navbar-nav ms-auto">
              {renderNavLink("/dashboard", "Accueil")}
              {renderNavLink("profile", "Mon Profil")}
              {renderNavLink("appearance", "Personnaliser l'apparence")}
              {renderNavLink("password", "Changer mon mot de passe")}
              {renderNavLink("text", "Changer la police")}
              {isAdmin ? (
                <>
                  {renderNavLink("users", "Gestion des utilisateurs")}
                  {renderNavLink("users/new", "Ajouter un utilisateur")}
                  {renderNavLink("requests/admin", "Gestion des demandes")}
                </>
              ) : (
                <>
                  {renderNavLink("requests/new", "Soumettre une demande")}
                  {renderNavLink("requests/user", "Mes demandes")}
                </>
              )}
              <div className="nav-item d-flex justify-content-center bg-white">
                <button
                  onClick={handleClick}
                  className={`btn bg-white shadow-sm text-${userData.couleur} btn-sm fw-medium w-100`}
                >
                  Se déconnecter
                  <i className="bi bi-box-arrow-right ms-2"></i>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="pt-2 bg-light rounded-bottom-3 pb-1 d-none d-lg-block">
        <ul className="list-unstyled d-flex justify-content-center gap-3 align-items-center mb-0">
          <li>{renderNavLink("/dashboard", "Accueil")}</li>
          <li>{renderNavLink("profile", "Mon Profil")}</li>
          <li>{renderNavLink("appearance", "Personnaliser l'apparence")}</li>
          <li>{renderNavLink("password", "Changer mon mot de passe")}</li>
          <li>{renderNavLink("text", "Changer la police")}</li>
          {isAdmin && (
            <>
              <li>{renderNavLink("users", "Gestion des utilisateurs")}</li>
              <li>{renderNavLink("users/new", "Ajouter un utilisateur")}</li>
              <li>{renderNavLink("requests/admin", "Gestion des demandes")}</li>
            </>
          )}
          {!isAdmin && (
            <>
              <li>{renderNavLink("requests/new", "Soumettre une demande")}</li>
              <li>{renderNavLink("requests/user", "Mes demandes")}</li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
