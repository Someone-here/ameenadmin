import { firestore } from "../utils/firebase.config";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import DataTable from "../components/DataTable";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function Users() {
  const [pending, setPending] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const applications = query(collection(firestore, "pending"));
    const unsub = onSnapshot(applications, (snap) => {
      setPending(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  return (
    <main className="w-screen h-screen">
      <header className="header w-11/12 p-6 m-2 border border-dashed border-slate-500">
        <h1 className={`${inter.className} text-6xl font-semibold`}>Users</h1>
      </header>
      <div className="flex h-full mt-6 items-center justify-center gap-8">
        <div className="left h-full w-[45%] align-middle gap-6 items-center flex flex-col">
          {pending.map(doc => <DataTable data={doc} onPress={() => setSelected(doc.id)} />)}
        </div>
        <div className="right h-full w-[45%]">
          {selected && (
            <>
              <div className="flex gap-8 h-full p-4">
                <button className="btn btn-outline btn-success w-1/2">Approve</button>
                <button className="btn btn-outline btn-error w-1/2">Disapprove</button>
              </div>

            </>
          )}
        </div>
      </div>
    </main>
  )
}