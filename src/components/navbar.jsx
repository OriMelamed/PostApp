import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

const Navbar = () => {
    const [user] = useAuthState(auth)
    const signUserOut = async () => {
        await signOut(auth)
    }
    return (
        <div>
            <Link to='/'>Homepage</Link>
            <Link to='/approvead'>Parasha</Link>
            {!user ? <Link to='/login'>Login</Link> :
                <Link to='/createpost'>Create Post</Link>}

            <div>
                {user && (
                    <>
                        <img src={user?.photoURL || ''} width='100' height="100" />
                        <button onClick={signUserOut}>Logout</button>
                        <p>{user?.displayName}</p>
                    </>)}
            </div>

        </div>
    )
}

export default Navbar