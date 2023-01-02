import { Inter } from "@next/font/google";
import Link from "next/link";
import { firestore } from "../utils/firebase.config";
import { useEffect, useState } from "react";
import { collection, limit, onSnapshot, query, deleteDoc, doc } from "firebase/firestore";
import Message from "../components/Message";
import ReplyArea from "../components/ReplyArea";

const inter = Inter({ subsets: ["latin"] });

function remove(q) {
  const docRef = doc(firestore, `messages/${q.id}`);
  return deleteDoc(docRef);
}

export default function Contact() {

  const [queries, setQueries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const messages = query(collection(firestore, "messages"), [limit(15)]);;
    return onSnapshot(messages, (snap) => {
      setQueries(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    })
  }, []);


  return (
    <main className="w-screen h-screen">
      <header className="header w-11/12 p-6 m-2 border border-dashed border-slate-500 flex gap-8">
        <h1 className={`${inter.className} text-6xl font-semibold w-2/3`}>
          Contact form
        </h1>
        <nav className="flex items-center w-1/3 justify-end pr-8">
          <Link href="/users" className="link link-hover text-xl">User Applications</Link>
        </nav>
      </header>
      <div className="flex h-full mt-6 items-center justify-center gap-8">
        <div className="left h-full w-[45%] align-middle gap-6 items-center flex flex-col">
          {queries.map(q => <Message query={q} onPress={() => setSelected(q)} onDelete={() => remove(q)} />)}
        </div>
        <div class="divider divider-horizontal"></div>
        <div className="right h-full w-[45%]">
          {selected && <ReplyArea name={selected.name} email={selected.email} />}
        </div>
      </div>
    </main>
  )
}