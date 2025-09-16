import { useState } from 'react';
import { db } from '../../../../firebase';

import { getDocs, collection } from 'firebase/firestore';


const useIndexPersons = () => {

    const [data, setData]: any = useState([])
    const [loading, setLoading]: any = useState(true)


    const personsCollectionRef = collection(db, "persons")

    const getAllPersons = async () => {
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

    return { getAllPersons, data, loading  , setData};
}

export default useIndexPersons