import { getModelForClass, ModelOptions, prop, Ref, Severity } from "@typegoose/typegoose";
import  { ObjectId } from "mongoose";
import { providerTypes, reportState } from "../../db/enums";
import { User } from "../userModel";

@ModelOptions({options: {allowMixed: Severity.ALLOW}})
export class Report {
    _id!: ObjectId
    
    @prop({ ref: () => User, required: true})
    public user!: Ref<User>;
    
    @prop({ ref: () => User, required: true})
    public provider!: Ref<User>;
    
    @prop({ required: true })
    public type!: providerTypes;

    @prop({ required: true })
    public title!: string;

    @prop({ required: true})
    public description!: string;
    
    @prop({ required: true})
    public lat!: Number

    @prop({ required: true})
    public lng!: Number

    @prop({ default: true})
    public visible!: boolean;

    @prop({ default: Date.now()}, )
    public createdAt!: Date;

    @prop({ default: Date.now() })
    public visibleAt!: Date;

    @prop({ default: reportState.published })
    public state!: reportState;
}

const reportModel = getModelForClass(Report);

export default reportModel;


