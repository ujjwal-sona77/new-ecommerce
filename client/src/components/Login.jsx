import React, { useState } from 'react'
import axios from 'axios'
import "./CSS/Login.css"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSubmitting) return
        
        setIsSubmitting(true)
        setError("")
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URI}/api/user/login`,
                { email, password }
            )
            if (response.status === 200) {
                const token = response.data.token
                localStorage.setItem("token", token)
                navigate("/home", { replace: true }) // Redirect to home page
            }
        } catch (error) {
            setError("Invalid email or password")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                
                <div className="form-group">
                    <input
                        type="email"
                        required
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button 
                    type="submit" 
                    className={`login-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                >
                    <div className="button-content">
                        {isSubmitting ? (
                            <>
                                <div className="spinner"></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </div>
                </button>
            </form>
        </div>
    )
}

export default Login
