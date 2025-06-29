import React, { useState } from "react";
import axios from "axios";

const AdminEditUserModal = ({ user, onClose, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/user/admin/user/${user._id}`, {
        username,
        email,
        isAdmin,
      });
      onSave();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-edit-modal-overlay" onClick={onClose}>
      <div className="admin-edit-modal" onClick={e => e.stopPropagation()}>
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Admin</label>
          <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
          {error && <div className="admin-edit-error">{error}</div>}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button type="submit" disabled={loading} className="admin-edit-save-btn">{loading ? "Saving..." : "Save"}</button>
            <button type="button" onClick={onClose} className="admin-edit-cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUserModal;
