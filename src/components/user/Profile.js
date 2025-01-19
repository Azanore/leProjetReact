import { useSelector } from "react-redux";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const couleurMap = {
    info: "Bleu clair",
    success: "Vert",
    danger: "Rouge",
    secondary: "Gris",
    primary: "Bleu",
    dark: "Noir",
  };

  return (
    <div className="container py-5 px-0">
      <div className="card border-0">
        <div className="card-body pt-0">
          <div className="row g-4">
            <h2 className="card-title text-center mb-4">
              Détails de l'utilisateur
            </h2>
            <div className="col-md-3 text-center">
              <img
                src={userData.photo}
                alt="Profil"
                className="img-thumbnail rounded-circle shadow-sm"
                style={{ width: "8rem", height: "8rem", objectFit: "cover" }}
              />
              <h4 className="mt-3 mb-0">{userData.pseudo}</h4>
              <p className="text-muted">{userData.email}</p>
            </div>

            <div className="col-md-9">
              <div className="row g-3 d-flex h-100 w-100">
                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Nom</small>
                    <strong>{userData.nom}</strong>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Prénom</small>
                    <strong>{userData.prenom}</strong>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Âge</small>
                    <strong>{userData.age} ans</strong>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Devise</small>
                    <strong>{userData.Devise}</strong>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Pays</small>
                    <strong>{userData.Pays}</strong>
                  </div>
                </div>

                <div className="col-md-6 col-lg-4">
                  <div className="p-3 bgflou shadow-sm rounded">
                    <small className="text-muted d-block">Couleur</small>
                    <strong>
                      {couleurMap[userData.couleur] || userData.couleur}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
