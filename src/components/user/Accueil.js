import { useSelector } from "react-redux";

function Accueil() {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.userData));
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="container text-center py-5">
      {/* En-tête principale */}
      <h1 className="mb-4 fw-bold">
        Bienvenue sur{" "}
        <span className={`text-${userData.couleur}`}>MonCoin</span> 🏠
      </h1>
      <p className="lead text-muted">
        Votre plateforme dédiée pour une gestion simplifiée et efficace de vos
        activités.
      </p>

      {/* Message conditionnel */}
      {isAuthenticated ? (
        <div className={`alert alert-${userData.couleur} mt-4 shadow-sm`}>
          🎉 Vous êtes connecté ! Profitez pleinement de toutes les
          fonctionnalités offertes par <strong>MonCoin</strong>.
        </div>
      ) : (
        <div className="alert alert-warning mt-4 shadow-sm">
          🔒 Connectez-vous pour accéder à votre tableau de bord personnalisé et
          débloquer toutes les fonctionnalités.
        </div>
      )}

      {/* Section Fonctionnalités */}
      <div className="mt-5">
        <h3 className="fw-semibold mb-4">
          🚀 Pourquoi choisir{" "}
          <span className={`text-${userData.couleur}`}>MonCoin</span> ?
        </h3>
        <div className="row justify-content-center gap-4">
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">📊 Gestion Simplifiée</h5>
                <p className="card-text text-muted">
                  Gérez vos demandes avec une interface claire et intuitive.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">⏱️ Suivi en Temps Réel</h5>
                <p className="card-text text-muted">
                  Consultez vos statuts instantanément depuis votre tableau de
                  bord.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">🎯 Simplicité & Clarté</h5>
                <p className="card-text text-muted">
                  Une expérience utilisateur optimisée pour une meilleure
                  productivité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appel à l'action */}
      {!isAuthenticated && (
        <div className="mt-5">
          <a href="/connexion" className="btn btn-primary btn-lg shadow-sm">
            🚪 Connectez-vous maintenant !
          </a>
        </div>
      )}
    </div>
  );
}

export default Accueil;
