import { Schema, model } from 'mongoose';

const schema = new Schema({
    forename: String,
    surname: String,
    email: String,
    ipaddress: String,
});
export default model('Member', schema);
