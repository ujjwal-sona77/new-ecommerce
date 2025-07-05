import React, { useState } from "react";
import axios from "axios";
import gsap from "gsap";


function useResponsiveStyle(styleObj) {
    // Simple hook to apply responsive styles
    const [style, setStyle] = React.useState(styleObj);
    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 500) {
                setStyle({ ...styleObj, ...styleObj['@media (max-width: 500px)'] });
            } else {
                setStyle(styleObj);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [styleObj]);
    return style;
}

const AdminEditUserModal = ({ user, onClose, onSave }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [admin, setAdmin] = useState(user.admin);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const modalStyle = useResponsiveStyle(styles.modal);
    const btnRowStyle = useResponsiveStyle(styles.btnRow);
    const saveBtnStyle = useResponsiveStyle(styles.saveBtn);
    const cancelBtnStyle = useResponsiveStyle(styles.cancelBtn);
    const titleStyle = useResponsiveStyle(styles.title);

    React.useEffect(() => {
        gsap.fromTo(
            ".admin-edit-modal",
            { y: 60, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/user/admin/user/${user._id}`, {
                username,
                email,
                admin,
            });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onSave();
                onClose();
            }, 1200);
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div
                className="admin-edit-modal"
                style={modalStyle}
                onClick={e => e.stopPropagation()}
            >
                <button
                    style={styles.closeBtn}
                    onClick={onClose}
                    aria-label="Close"
                >
                    &times;
                </button>
                <h3 style={titleStyle}>Edit User</h3>
                <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
                    <label style={styles.label}>Username</label>
                    <input
                        style={styles.input}
                        value={username}
                        name="username"
                        onChange={e => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                    <label style={styles.label}>Email</label>
                    <input
                        style={styles.input}
                        value={email}
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        type="email"
                    />
                    <div style={styles.switchRow}>
                        <label htmlFor="admin-switch" style={styles.label}>Admin</label>
                        <label style={styles.switch}>
                            <input
                                id="admin-switch"
                                name="admin"
                                type="checkbox"
                                checked={admin}
                                onChange={e => setAdmin(e.target.checked)}
                                style={{ display: "none" }}
                            />
                            <span
                                style={{
                                    ...styles.slider,
                                    ...(admin ? styles.sliderChecked : {}),
                                    ...styles.sliderRound,
                                }}
                            >
                                <span
                                    style={{
                                        ...styles.sliderBefore,
                                        transform: admin ? "translateX(20px)" : "translateX(0)",
                                        background: "#fff",
                                        display: "block",
                                    }}
                                />
                            </span>
                        </label>
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    {success && <div style={styles.success}>User updated successfully!</div>}
                    <div style={btnRowStyle}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={saveBtnStyle}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            style={cancelBtnStyle}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEditUserModal;
