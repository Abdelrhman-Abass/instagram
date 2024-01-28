import { INewUser } from "@/types";
import { ID ,Query } from "appwrite";

import { appWriteConfig, account, db, avatars } from "./config";

export async function createUserAccount(user:INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
          );
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId : newAccount.$id,
            name : newAccount.name,
            email : newAccount.email,
            username : user.username,
            imageUrl :avatarUrl
        })


        return newUser    
    }
 
    catch(error){
        console.log(error);
        return error
    }
}
export async function saveUserToDB(user:{
    accountId : string,
    email:string,
    name:string,
    imageUrl:URL,
    username?:string,
}){
    try {
        const newUser = await db.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser
        
    } catch (error) {
        console.log(error)
        
    }

}

export async function signInAccount( user:{email:string ; password:string}){
    try {
        const session = await account.createEmailSession(user.email,user.password);
        return session
    } catch (error) {
        console.log(error)
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await db.listDocuments(
        appWriteConfig.databaseId,
        appWriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }