function RequestUserDelete({ demandeId, status, onDelete }) {
  const handleClick = () => {
    onDelete(demandeId);
  };

  return (
    <button
      className={`btn btn-sm ${
        status !== "en_attente" ? "btn-outline-danger" : "btn-danger"
      }`}
      onClick={handleClick}
      disabled={status !== "en_attente"}
    >
      Annuler
    </button>
  );
}

export default RequestUserDelete;
