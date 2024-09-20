import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    doc, 
    getDocs, 
    getDoc,
    query,
    where
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDOs1Ed0_u9aPIfxP6TleWOwBC-M-Z1zn8",
  authDomain: "vanlife-b6d33.firebaseapp.com",
  projectId: "vanlife-b6d33",
  storageBucket: "vanlife-b6d33.appspot.com",
  messagingSenderId: "214811189939",
  appId: "1:214811189939:web:333e22b94a74dcdcb546c6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, 'vans')


export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const vanRef = doc(db, "vans", id)
    const snapshot = await getDoc(vanRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where('hostId', '==', '123'))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}



export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}