import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, name, password}){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(), 
                email: email, 
                password: password, 
                name: name
            })
            if(userAccount) {
                return this.login({email:email, password:password})
            }else{
                return userAccount;
            }
        } catch (error){
            throw error
        }

    }

    async login ({email, password}){
        try{
            return await this.account.createEmailPasswordSession({
                email: email, 
                password: password
            })
        }catch(error){
            throw error
        }
        

    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            throw error;
            // console.log("User Not logged in!")
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService