import mongoose ,{Schema,models} from 'mongoose'
import { unique } from 'next/dist/build/utils'
const UserSchema = new Schema(
    {
        Username:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase:true
        }
        ,password:{
            type: String,
            required:true,
            select:false
        }
        ,avatar:{
            type: String,
            default:""
        }
        ,role:{
            type: String,
            enum:["admin","user"],
            default:["user"]

        },
    },
    {timestamps : true}
) 
export default models.User || mongoose.model("User",UserSchema);