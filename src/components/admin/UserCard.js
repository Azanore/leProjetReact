import React from "react";
import { useSelector } from "react-redux";
import UserDelete from "./UserDelete";

const UserCard = ({
  userData: { id, photo, nom, prenom, Pays, admin },
  fetchData,
  onModifyClick,
  onDetailsClick,
  setActiveSection,
  setSelectedUserId,
}) => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3 flex-grow-1 shadow-sm"
      style={{ maxWidth: "300px", margin: "auto" }}
    >
      <div
        className={`card h-100 p-3 ${
          id === userData.id ? `border-2 border-${userData.couleur}` : "border"
        }`}
      >
        <div className="position-relative">
          <img
            src={photo}
            alt={`${prenom} ${nom}`}
            className="card-img-top object-fit-cover "
          />
          {admin && (
            <span className="position-absolute top-0 end-0 badge bg-success m-2">
              Admin
            </span>
          )}
        </div>

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold mb-3">
            {nom} {prenom}
          </h5>

          <div className="mb-3">
            <p className="card-text mb-2">
              <i className="bi bi-globe me-2"></i>
              {Pays}
            </p>
            <p className="card-text text-muted">
              {admin ? "Administrateur" : "Utilisateur standard"}
            </p>
          </div>

          <div className="mt-auto">
            <div className="d-grid gap-2">
              <button
                onClick={() => onDetailsClick(id)}
                className="btn btn-primary"
              >
                Détails
              </button>
              <div className="d-flex gap-2">
                <button
                  onClick={() => onModifyClick(id)}
                  className="btn btn-outline-success flex-grow-1"
                  disabled={admin && id !== userData.id}
                >
                  Modifier
                </button>
                <UserDelete
                  userId={id}
                  fetchData={fetchData}
                  setSelectedUserId={setSelectedUserId}
                  setActiveSection={setActiveSection}
                  admin={admin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
