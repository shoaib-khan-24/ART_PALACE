import conf from '../conf/conf'
import {Client, ID, TablesDB, Storage, Query} from 'appwrite'

export class Service{
    client = new Client();
    tablesDB;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)

        this.tablesDB = new TablesDB(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featured_image, status, user_id}){
        try{
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featured_image,
                    user_id,
                    status
                }
            })
        }catch(error){
            console.log("Appwrite Service :: createPost Error :: ", error);
            return false;
        }
    }

    async updatePost(slug, {title, content, featured_image, status}){
        try{
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featured_image,
                    status
                }
            })
        }catch(error){
            console.log("Appwrite Service :: updatePost Error :: ", error);
            return false
        }
    }

    async deletePost(slug){
        try{
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                
            })
            return true;
        }catch(error){
            console.log("Appwrite Service :: deletePost Error :: ", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        }catch(error){
            console.log("Appwrite Service :: getPost Error :: ", error);
            return false;
        }
    }

    async getPosts(){
        try{
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: [
                    Query.equal('status', 'active')
                ]
            })
        }catch(error){
            console.log("Appwrite Service :: getPosts Error :: ", error);
            return false;
        }
    }

    //upload file and bucket services

    async uploadFile(file){
        try{
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        }catch(error){
            console.log("Appwrite Service :: uploadFile Error :: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId
            })
            return true
        }catch(error){
            console.log("Appwrite Service :: deleteFile Error :: ", error);
            return false;
        }
    }

    getFilePreview(fileId){                      //not useful
        return this.bucket.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        })
    }

    getFileView(fileId) {
        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId: fileId
        });
    }
}

const service = new Service()
export default service