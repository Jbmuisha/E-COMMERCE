
import mongoose  from 'mongoose'

const mongodbUrl=process.env.MONGODB_URI as string
const mongodbName= process.env.MONGODB_NAME as string

if (!mongodbUrl){
    throw new Error (" mongoDBurl is not exist")
}
if(!mongodbName){
    throw new Error(" mongoDb name does not exist")
}

export default async function connection(){
  
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB déjà connecté");
        return mongoose.connection;
    }

    try{
        await mongoose.connect(mongodbUrl, {dbName: mongodbName});
        console.log("✅ DATA BASE CONNECTED SUCCESSFULLY");
        return mongoose.connection;
    } catch( err){
        console.error(" Erreur de connexion MongoDB:", err);
        throw err;
    }
}


export async function testConnection(): Promise<boolean> {
    try {
        if (mongoose.connection.readyState === 1) {
         
            if (mongoose.connection.db) {
                await mongoose.connection.db.admin().ping();
            }
            return true;
        } else {
            await connection();
            return true;
        }
    } catch (error) {
        console.error("Test de connexion échoué:", error);
        return false;
    }
}

