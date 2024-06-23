import mongoose from "mongoose"

const connection = async ()=>{
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1){
        console.log('Database Already Connected');
        return
    }
    if(connectionState === 2){
        console.log('Database Connecting');
        return;
    }
    try{
        mongoose.connect(process.env.MONGODB_URI!,{dbName: 'RESTAPI',bufferCommands:true});
        console.log('Database Connected');
    }
    catch(error:any){
        console.log('Error',error.message);
        throw new Error('Error',error.message);
    }
}

export default connection;