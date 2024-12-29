import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData.admin;

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Adresse */}
          <div className="col-md-4">
            <h5 className={`mb-3 text-${userData.couleur}`}>Notre Adresse</h5>
            <ul className="list-unstyled">
              <li>456 Avenue Mohammed V</li>
              <li>Rabat, Maroc</li>
              <li>Tél: +212 5 37 77 55 99</li>
              <li>Email: mon.coin@gmail.com</li>
            </ul>
          </div>

          {/* Liens Rapides */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className={`mb-3 text-${userData.couleur}`}>Liens Rapides</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/dashboard" className="text-light">
                  Accueil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="profile" className="text-light">
                  Profil
                </Link>
              </li>
              <li className="mb-2">
                <Link to="appearance" className="text-light">
                  Modifier la couleur
                </Link>
              </li>
              <li className="mb-2">
                {!isAdmin ? (
                  <Link to="requests/user" className="text-light">
                    Afficher les demandes
                  </Link>
                ) : (
                  <Link to="requests/admin" className="text-light">
                    Gérer les demandes
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div className="col-md-4">
            <h5 className={`mb-3 text-${userData.couleur}`}>Suivez-nous</h5>
            <div className="d-flex gap-3">
              <a href="_" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="_" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="_" className="text-light fs-4">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="_" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-4 border-light" />

        {/* Copyright */}
        <div className="row">
          <div className="col-12 text-center">
            <p className={`m-0 text-${userData.couleur}`}>
              © 2024 MonCoin. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
