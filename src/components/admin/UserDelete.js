import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions";

function UserDelete({
  userId,
  fetchData,
  setActiveSection,
  setSelectedUserId,
  admin,
}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteUser(userId))
      .then(() => {
        fetchData(); // Mettre à jour la liste des utilisateurs
        setSelectedUserId(null);
        setActiveSection(null);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <button
      className="btn btn-outline-danger btn-sm"
      type="button"
      onClick={handleClick}
      disabled={admin}
    >
      <i className="bi bi-x"></i>
    </button>
  );
}

export default UserDelete;
