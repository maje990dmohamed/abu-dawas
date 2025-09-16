import { collection, getDocs } from 'firebase/firestore'
import  { useState } from 'react'
import { db } from '../../../firebase'

const useIndexHealthInsurance = () => {

    const [data, setData]: any = useState([])
    const [loading, setLoading]: any = useState(true)


    const personsCollectionRef = collection(db, "healthCertificates")

    const getAllCertificates = async () => {
        try {

            const data = await getDocs(personsCollectionRef)

            const filterdData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))

            setData(filterdData)
            console.log(filterdData, 'ana data');
            setLoading(false)

        } catch (error) {

            console.log('errorrrr', error);
            setLoading(false)

        }

    }
    return { getAllCertificates , loading , data , setData }
}

export default useIndexHealthInsurance