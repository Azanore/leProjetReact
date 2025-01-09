import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "./UserList";
import UserModify from "./UserModify";
import UserDetails from "./UserDetails"; // Un composant pour afficher les détails de l'utilisateur
import UserCard from "./UserCard";

function UsersList() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // Id de l'utilisateur sélectionné
  const [activeSection, setActiveSection] = useState(null); // Section active: "modify" ou "details"
  const [viewMode, setViewMode] = useState("listView");
  const fetchData = () => {
    axios
      .get("https://675afd529ce247eb19354af3.mockapi.io/users")
      .then((response) => {
        setAllUsersData(response.data);
      })
      .catch((error) => console.error("Error fetching users data:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleViewMode = (ev) => {
    setViewMode(ev.target.value);
  };

  const handleActionClick = (userId, section) => {
    if (selectedUserId === userId && activeSection === section) {
      // Si la même section est déjà active, on la désactive
      setSelectedUserId(null);
      setActiveSection(null);
    } else {
      // Sinon, on active la nouvelle section
      setSelectedUserId(userId);
      setActiveSection(section);
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="pt-5 px-3 col-9">
          <div className="container-fluid px-0">
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
              <caption className="h2 p-0 m-0">
                Liste complète des utilisateurs
              </caption>
              <div className="btn-group" role="group" aria-label="Affichage">
                <input
                  type="radio"
                  className="btn-check"
                  name="viewMode"
                  id="listView"
                  autoComplete="off"
                  defaultChecked
                  onChange={handleViewMode}
                  value={"listView"}
                  checked={viewMode === "listView"}
                />
                <label className="btn btn-outline-primary" htmlFor="listView">
                  <i className="bi bi-list-ul"></i>
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="viewMode"
                  id="cardView"
                  autoComplete="off"
                  onChange={handleViewMode}
                  value={"cardView"}
                  checked={viewMode === "cardView"}
                />
                <label className="btn btn-outline-primary" htmlFor="cardView">
                  <i className="bi bi-grid"></i>
                </label>
              </div>
            </div>
          </div>

          {viewMode === "listView" && (
            <table className="table table-striped table-borderless caption-top table-hover mb-0 border-bottom mb-3">
              <thead className="table-dark">
                <tr>
                  <th>Photo</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Pays</th>
                  <th>Rôle</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsersData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Aucun utilisateur enregistré
                    </td>
                  </tr>
                ) : (
                  allUsersData.map((user) => (
                    <UserList
                      key={user.id}
                      userData={user}
                      fetchData={fetchData}
                      onModifyClick={() => handleActionClick(user.id, "modify")} // Bouton Modifier
                      onDetailsClick={() =>
                        handleActionClick(user.id, "details")
                      } // Bouton Détails
                      setSelectedUserId={setSelectedUserId}
                      setActiveSection={setActiveSection}
                    />
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* Vue Carte */}
          {viewMode === "cardView" && (
            <div className="d-flex flex-wrap gap-4 ">
              {allUsersData.length === 0 ? (
                <p className="text-center w-100">
                  Aucun utilisateur enregistré
                </p>
              ) : (
                allUsersData.map((user) => (
                  <UserCard
                    key={user.id}
                    userData={user}
                    onModifyClick={() => handleActionClick(user.id, "modify")}
                    onDetailsClick={() => handleActionClick(user.id, "details")}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Modify and Details Section */}
        <div className="d-flex flex-column col-3">
          {/* Afficher la section active */}
          {activeSection === "modify" && selectedUserId && (
            <div className="mb-4 " style={{ height: "100%" }}>
              <UserModify
                userId={selectedUserId}
                fetchData={fetchData}
                setSelectedUserId={setSelectedUserId}
              />
            </div>
          )}

          {activeSection === "details" && selectedUserId && (
            <div className="mb-4" style={{ height: "100%" }}>
              <UserDetails userId={selectedUserId} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UsersList;
