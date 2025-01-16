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
          ? `btn btn-${userData.couleur} btn-sm px-3 fw-medium `
          : `btn bg-white shadow-sm text-${userData.couleur} btn-sm px-3 fw-medium `
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
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
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
              {renderNavLink("appearance", "Thème")}
              {renderNavLink("password", "Mot de passe")}
              {renderNavLink("text", "Police")}
              {isAdmin ? (
                <>
                  {renderNavLink("users", "Liste utilisateurs")}
                  {renderNavLink("users/new", "Ajouter utilisateur")}
                  {renderNavLink("requests/admin", "Voir demandes")}
                </>
              ) : (
                <>
                  {renderNavLink("requests/new", "Créer demande")}
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
          <li>{renderNavLink("appearance", "Thème")}</li>
          <li>{renderNavLink("password", "Mot de passe")}</li>
          <li>{renderNavLink("text", "Police")}</li>
          {isAdmin && (
            <>
              <li>{renderNavLink("users", "Liste utilisateurs")}</li>
              <li>{renderNavLink("users/new", "Ajouter utilisateur")}</li>
              <li>{renderNavLink("requests/admin", "Voir demandes")}</li>
            </>
          )}
          {!isAdmin && (
            <>
              <li>{renderNavLink("requests/new", "Créer demande")}</li>
              <li>{renderNavLink("requests/user", "Mes demandes")}</li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
