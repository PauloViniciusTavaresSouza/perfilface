import { useEffect, useState } from "react"
import "./styles.scss"
import { GoogleLogo  } from "phosphor-react"
import {GoogleAuthProvider, signInWithPopup, User} from 'firebase/auth'
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from 'firebase/firestore'
import { auth } from "../../services/firebase"
import { app } from "../../services/firebase"


export function SignIn() {
  const [user, setUser] = useState<User>({} as User)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [usuario, setUsuario] = useState <{id: string}[]>([])

  const db = getFirestore(app)
  const userCollectionRef = collection(db, "users")

  async function deleteUser(id:string){
    const userDoc = doc(db, "user", id) 
    await deleteDoc(userDoc)
  }

  async function handleCriate(){
    const newUser = await addDoc(userCollectionRef,{
      name,
      email,
    } ) 
    console.log(newUser);
  }

  useEffect(() => {
    const getUsers = async() => {
      const querySnapshot  = await getDocs(userCollectionRef)
      const users = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUsuario(users)
      console.log(usuario);
    }
    getUsers()
  },[])




  function handleGoogleSignIn(){
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);      
      setUser(result.user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="container">
      <div className="user">
        {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}
        <strong>{user.displayName}</strong>
        <small>{user.email}</small>
      </div>
      
      <h1>Acesse sua conta</h1>
      <span>
        Utilizando autenticação social, por exemplo, autenticação com o Google você <br/>
        facilita a vida do usuário permitindo sua aplicação sem fazer cadastro.
      </span>
      <button onClick={handleGoogleSignIn} type="button" className="button">
        <GoogleLogo />
        Entrar com o Google
      </button>

      <div>
        <input type="text" placeholder="Nome..." value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleCriate}>criar usuário</button>
      </div>
    </div>
  )
}