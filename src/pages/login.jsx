import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate('/')
    }
    return (
        <div>
            <h1>Login</h1>
            <button onClick={signInWithGoogle}>sign in with google</button>
        </div>
    )
}
