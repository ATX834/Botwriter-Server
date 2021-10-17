import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
    
    @prop({ required: true, unique: true })
    private username: string;

    @prop({ required: true })
    private password: string;

    constructor(username: string, password: string)
    {
        this.username = username;
        this.password = password;
    };

       public get Username(): string
    {
        return this.username;
    }

    public set Username(username: string)
    {
        this.username = username;
    }

    public get Password(): string
    {
        return this.password;
    }

    public set Password(password: string)
    {
        this.password = password;
    }
}

const UserModel = getModelForClass(User);

export default UserModel;