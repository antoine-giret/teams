import { storage as firebaseStorage } from 'firebase'

import FirebaseService from './firebase'

class StorageService {
  private static instance: StorageService

  private storageRef: firebaseStorage.Reference

  constructor() {
    const { storage } = FirebaseService.getInstance()

    this.storageRef = storage.ref()
  }

  static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }

    return StorageService.instance
  }

  async uploadFile(path: string, file: File): Promise<string | null> {
    try {
      const pictureRef = this.storageRef.child(path)
      const snapshot = await pictureRef.put(file)

      return snapshot.ref.getDownloadURL()
    } catch (err) {
      console.error(`[StorageService][uploadFile] failed: ${err}`)
      return null
    }
  }
}

export default StorageService
