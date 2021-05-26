import mongoose, { Schema } from 'mongoose';

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        unique: true
    }
});

export default mongoose.model('Category', categorySchema);