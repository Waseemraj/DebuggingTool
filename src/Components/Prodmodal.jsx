const CustomModal = ({ isOpen, onClose, wxUserId, msUserId, wxOrgId }) => {
    if (!isOpen) return null;
  
    return (
      <div className="custom-modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <p>User Exists with:</p>
          <p>wxUserID: {wxUserId}</p>
          <p>msUserID: {msUserId}</p>
          <p>wxOrgID: {wxOrgId}</p>
        </div>
      </div>
    );
  };
  
  export default CustomModal;