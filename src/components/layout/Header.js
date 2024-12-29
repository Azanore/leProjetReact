import { useDispatch, useSelector } from "react-redux";
function Header() {
  const userData = useSelector((state) => state.auth.userData);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <header
      className={`d-flex justify-content-between align-items-center p-2 bg-dark text-white shadow-sm`}
    >
      <div className="d-flex align-items-center">
        <img
          src="\logo.svg"
          alt="logo"
          className="img-fluid rounded ms-2"
          style={{ width: "48px" }}
        />
        <h1 className={`ms-3 mb-0 text-${userData.couleur}`}>MonCoin</h1>
      </div>

      {userData && (
        <div className="d-flex align-items-center ">
          <span className={`text-${userData.couleur} me-2`}>
            <strong>
              {userData.nom} {userData.prenom}
            </strong>
          </span>
          <img
            src={userData.photo}
            alt="User Avatar"
            className={`rounded-circle border border-1 border-${userData.couleur}`}
            style={{ width: "40px", height: "40px" }}
          />
          <button
            onClick={handleClick}
            className={`btn btn-outline-${userData.couleur} ms-5 me-2 rounded-0`}
            style={{ borderStyle: "dashed" }}
          >
            Se déconnecter
            <i className="bi bi-box-arrow-right ms-2"></i>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
