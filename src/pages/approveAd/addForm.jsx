import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

export const AddForm = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const schema = yup.object().shape({
        username: yup.string().required("You must add a name"),
        email: yup.string().required("You must add an email address."),
        approveAd: yup.boolean()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const parashasRef = collection(db, 'parasha')

    const onCreatePost = async (data) => {
        await addDoc(parashasRef, {
            ...data
        })
        navigate('/')
    }

    return <form onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder='Name...' {...register("username")} />
        <p>{errors.title?.message}</p>
        <input type='email' placeholder='email...' {...register("email")} />
        <p>{errors.description?.message}</p>
        <label>Approve Advertisment content?</label>
        <input type='checkbox' {...register("approveAd")} />
        <input type="submit" />
    </form>

}