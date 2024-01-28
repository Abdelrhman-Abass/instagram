import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appWriteConfig ={
    projectID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url : import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    mediaBucketId: import.meta.env.VITE_APPWRITE_MEDIABUCKET_ID,
    savesCollectionID: import.meta.env.VITE_APPWRITE_SAVES_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USER_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POST_ID,
}
export const client = new Client();

client.setProject(appWriteConfig.projectID)
client.setEndpoint(appWriteConfig.url)

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
