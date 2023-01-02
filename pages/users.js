import { firestore, storage } from "../utils/firebase.config";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import DataTable from "../components/DataTable";
import { Inter } from "@next/font/google";
import { ref, getDownloadURL } from "firebase/storage";

const inter = Inter({ subsets: ["latin"] });

export default function Users() {
  const [pending, setPending] = useState([]);
  const [selected, setSelected] = useState(null);
  const [idURL, setIdURL] = useState(null);
  const [siaURL, setSiaURL] = useState(null);
  const [tab, setTab] = useState("ID");

  useEffect(() => {
    const applications = query(collection(firestore, "pending"));
    const unsub = onSnapshot(applications, (snap) => {
      setPending(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!selected) return;
    getDownloadURL(ref(storage, `proofs/ID-${selected.id}.jpg`)).then(setIdURL);
    if (selected.role !== "guard") return;
    getDownloadURL(ref(storage, `proofs/SIA-${selected.id}.jpg`)).then(
      setSiaURL
    );
  }, [selected]);

  useEffect(() => {}, [tab]);

  return (
    <main className="w-screen h-screen">
      <header className="header w-11/12 p-6 m-2 border border-dashed border-slate-500">
        <h1 className={`${inter.className} text-6xl font-semibold`}>
          User Applications
        </h1>
      </header>
      <div className="flex h-full mt-6 items-center justify-center gap-8">
        <div className="left h-full w-[45%] align-middle gap-6 items-center flex flex-col">
          {pending.map((doc) => (
            <DataTable data={doc} onPress={() => setSelected(doc)} expanded={!!selected} />
          ))}
          {!pending.length && <button class="btn btn-square loading"></button>}
        </div>
        <div class="divider divider-horizontal"></div>
        <div className="right h-full w-[45%]">
          {selected && (
            <div className="h-full">
              <div
                className="tabs tabs-boxed bg-white mb-6"
                onClick={({ target }) => {
                  if (!target.id) return;
                  setTab(target.id);
                }}
              >
                <a
                  className={`tab h-12 text-lg ${
                    tab == "ID" ? "tab-active" : ""
                  }`}
                  id="ID"
                >
                  ID Proof
                </a>
                {selected.role == "guard" ? (
                  <a
                    className={`tab h-12 text-lg ${
                      tab == "SIA" ? "tab-active" : ""
                    }`}
                    id="SIA"
                  >
                    SIA Proof
                  </a>
                ) : null}
              </div>
              <img src={siaURL} className={`aspect-auto ${tab == "SIA" ? '' : 'hidden'}`} />
              {selected.role =="guard" && <img src={idURL} className={`aspect-auto ${tab == "ID" ? '' : 'hidden'}`} /> }
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
