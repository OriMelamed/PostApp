
import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'

export default function Post(props) {
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState(null)
    const likesRef = collection(db, 'likes')
    const likesDoc = query(likesRef, where("postId", "==", props.post.id))

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })))
    }

    const addLike = async (data) => {
        try {


            await addDoc(likesRef, { userId: user?.uid, postId: props.post.id })
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }])
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    const removeLike = async (data) => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", props.post.id), where("userId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id)
            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) => prev?.filter((like) => like.id === likeToDeleteData.docs[0].id))
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getLikes()
    }, [])

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    return (
        <div>
            <h1>{props.post.title}</h1>
            <h2>{props.post.description}</h2>
            <p>{props.post.username}</p>
            {user ? <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button> : null
            }            {likes && <p>Likes: {likes?.length}</p>}
        </div>
    )
}
