import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({
    timestamps:true
})
export class User extends Document{
    @Prop({
        required: true
    })
    firstName: string

    @Prop({
        required: true
    })
    lastName: string

    @Prop({
        required: true,
        unique: true
    })
    username:string
    
    @Prop({
        required: true,
        unique: true
    })
    email:string

    @Prop({
        required: true
    })
    password:string
}

// export type UserDocument = User & Document;


export const userSchema = SchemaFactory.createForClass(User)
