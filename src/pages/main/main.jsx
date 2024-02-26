import { getDocs, collection, } from 'firebase/firestore'
import { db } from '../../config/firebase'
import React, { useEffect, useState } from 'react'
import Post from './post'

export default function Main() {
    const [postsLists, setPostsList] = useState(null)
    const postRef = collection(db, "posts")

    const getPosts = async () => {
        const data = await getDocs(postRef)
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            <h1>Homepage</h1>
            {postsLists?.map(post => (
                < Post key={post.id} post={post} />
            ))}
        </div>
    )
}
