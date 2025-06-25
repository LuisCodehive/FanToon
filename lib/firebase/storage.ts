import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./config"

export async function uploadPhoto(file: File, orderId: string): Promise<{ url: string; path: string }> {
  try {
    const timestamp = Date.now()
    const fileName = `${timestamp}_${file.name}`
    const path = `orders/${orderId}/photos/${fileName}`
    const storageRef = ref(storage, path)

    // Upload file
    const snapshot = await uploadBytes(storageRef, file)

    // Get download URL
    const url = await getDownloadURL(snapshot.ref)

    return { url, path }
  } catch (error) {
    console.error("Error uploading photo:", error)
    throw new Error("Failed to upload photo")
  }
}

export async function uploadGeneratedBook(
  bookBuffer: Buffer,
  orderId: string,
  format: "pdf" | "jpg",
): Promise<{ url: string; path: string }> {
  try {
    const timestamp = Date.now()
    const fileName = `book_${orderId}_${timestamp}.${format}`
    const path = `generated-books/${orderId}/${fileName}`
    const storageRef = ref(storage, path)

    // Upload file
    const snapshot = await uploadBytes(storageRef, bookBuffer)

    // Get download URL
    const url = await getDownloadURL(snapshot.ref)

    return { url, path }
  } catch (error) {
    console.error("Error uploading generated book:", error)
    throw new Error("Failed to upload generated book")
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    console.error("Error deleting file:", error)
    throw new Error("Failed to delete file")
  }
}
