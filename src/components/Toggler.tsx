import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function Toggler({ oldState = false, collectionName, row }: { oldState?: boolean, collectionName: string, row: any }) {
    const [active, setActive] = useState(oldState ? oldState : false);
    console.log("toggle row", row);

    const toggleTheme = async () => {
        const oldState = active;
        setActive(!active);
        // handle logic here
        try {
            const ref = doc(db, collectionName, row?.id || "");
            await setDoc(ref, { preventScan: !oldState }, { merge: true });
            if (oldState) {
                toast.success("تم سماح مسح الكود بنجاح");
            } else {
                toast.success("تم منع مسح الكود بنجاح");
            }
        } catch (error) {
            toast.error("فشل منع مسح الكود");
            setActive(oldState);
        }
    };

    return (
        <div className="flex items-center !cursor-pointer justify-center">
            <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full cursor-pointer  border  flex justify-center items-center
        ${active ? "bg-[var(--primary)] " : "bg-white"}`}
            >
                <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full border flex items-center justify-center 
          shadow-md 
          ${active ? " translate-x-0 " : "translate-x-6"} transition-all duration-300`}
                >

                </span>
            </button>
        </div>

    );
}
