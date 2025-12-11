import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const useInsurances = () => {
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    const getInsurances = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "insuranceSelectMenu")
        );

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const arr = docData.insurance;
          console.log("Fetched array:", arr);
          setInsurances(arr);
        }
      } catch (error) {
        console.error("Error fetching insuranceSelectMenu:", error);
      }
    };
    getInsurances();
  }, []);

  return { insurances };
};

export default useInsurances;
