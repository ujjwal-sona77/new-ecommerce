import React, { useState } from "react";
import { userService } from "../services/userService";
import './CSS/EditUser.css';

const EditUser = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic ? `data:image/png;base64,${user.profilePic}` : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await userService.editUser(user.email, { username, email }, profilePic);
      setSuccess("Profile updated successfully!");
      if (onUpdate) onUpdate();
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div className="edit-user-field">
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      </div>
      <div className="edit-user-field">
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
      </div>
      <div className="edit-user-field">
        <label>Profile Picture</label>
        <input type="file" accept="image/*" onChange={handlePicChange} />
        {preview && <img src={preview} alt="Preview" className="edit-user-preview" />}
      </div>
      <button type="submit" className="edit-user-btn" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
      {error && <div className="edit-user-error">{error}</div>}
      {success && <div className="edit-user-success">{success}</div>}
    </form>
  );
};

export default EditUser;
