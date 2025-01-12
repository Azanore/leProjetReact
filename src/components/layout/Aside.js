import { NavLink } from "react-router-dom";
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
    <div className="bg-light pt-3 pb-5 rounded d-xl-block d-none">
      <nav
        className="bg-white  rounded-end-4 shadow-sm  d-flex gap-0"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={toggleMenu}
          className={`btn btn-${userData.couleur}  p-1 btn-sm rounded-0 rounded-end-2 `}
          aria-expanded={isOpen}
        ></button>
        <ul
          className={`list-unstyled d-flex flex-column gap-2 mt-4  ${
            isOpen ? "" : "d-none"
          }`}
        >
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                  : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              end
              className={({ isActive }) =>
                isActive
                  ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                  : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
              }
            >
              Mon profil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="appearance"
              end
              className={({ isActive }) =>
                isActive
                  ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                  : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
              }
            >
              Personnaliser l'apparence
            </NavLink>
          </li>
          <li>
            <NavLink
              to="password"
              end
              className={({ isActive }) =>
                isActive
                  ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                  : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
              }
            >
              Changer mon mot de passe
            </NavLink>
          </li>
          <li>
            <NavLink
              to="text"
              end
              className={({ isActive }) =>
                isActive
                  ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                  : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
              }
            >
              Changer la police
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink
                to="users"
                end
                className={({ isActive }) =>
                  isActive
                    ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                    : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                }
              >
                Gestion des utilisateurs
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="users/new"
                end
                className={({ isActive }) =>
                  isActive
                    ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                    : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                }
              >
                Ajouter un utilisateur
              </NavLink>
            </li>
          )}
          {!isAdmin && (
            <li>
              <NavLink
                to="requests/new"
                end
                className={({ isActive }) =>
                  isActive
                    ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                    : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                }
              >
                Soumettre une demande
              </NavLink>
            </li>
          )}
          {!isAdmin && (
            <li>
              <NavLink
                to="requests/user"
                end
                className={({ isActive }) =>
                  isActive
                    ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                    : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                }
              >
                Mes demandes
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <li>
              <NavLink
                to="requests/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? `btn btn-${userData.couleur}  btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                    : `btn  text-${userData.couleur} btn-sm rounded-0 rounded-end-2 w-100 fw-medium`
                }
              >
                Gestion des demandes
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Aside;
