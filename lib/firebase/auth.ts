import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./config"

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

// Configurar el proveedor de Google
googleProvider.setCustomParameters({
  prompt: "select_account",
})



export interface UserProfile {
  uid: string
  email: string
  name: string
  photoURL?: string
  createdAt: string
  lastLoginAt: string
  ordersCount: number
}

export const signInWithGoogle = async (): Promise<UserProfile> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Crear o actualizar perfil de usuario en Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name: user.displayName!,
      photoURL: user.photoURL || undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      ordersCount: 0,
    }

    // Verificar si el usuario ya existe
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      // Usuario existente - solo actualizar último login
      await setDoc(
        doc(db, "users", user.uid),
        {
          lastLoginAt: serverTimestamp(),
          photoURL: user.photoURL || undefined,
          name: user.displayName!,
        },
        { merge: true },
      )
    } else {
      // Nuevo usuario - crear perfil completo
      await setDoc(doc(db, "users", user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      })
    }

    return userProfile
  } catch (error: any) {
    console.error("Error signing in with Google:", error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}


export const signInWithFacebook = async (): Promise<UserProfile> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    const user = result.user

    // Crear o actualizar perfil de usuario en Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      name: user.displayName!,
      photoURL: user.photoURL || undefined,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      ordersCount: 0,
    }

    // Verificar si el usuario ya existe
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      // Usuario existente - solo actualizar último login
      await setDoc(
        doc(db, "users", user.uid),
        {
          lastLoginAt: serverTimestamp(),
          photoURL: user.photoURL || undefined,
          name: user.displayName!,
        },
        { merge: true },
      )
    } else {
      // Nuevo usuario - crear perfil completo
      await setDoc(doc(db, "users", user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      })
    }

    return userProfile
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error)
    throw new Error(getAuthErrorMessage(error.code))
  }
}


export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      const data = userDoc.data()
      return {
        uid,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        lastLoginAt: data.lastLoginAt?.toDate?.()?.toISOString() || data.lastLoginAt,
        ordersCount: data.ordersCount || 0,
      }
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/popup-closed-by-user":
      return "El proceso de autenticación fue cancelado"
    case "auth/popup-blocked":
      return "El popup fue bloqueado por el navegador. Por favor, permite popups para este sitio"
    case "auth/cancelled-popup-request":
      return "Proceso de autenticación cancelado"
    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu conexión a internet"
    default:
      return "Error al iniciar sesión. Intenta nuevamente"
  }
}

// Listener para cambios de autenticación
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}
