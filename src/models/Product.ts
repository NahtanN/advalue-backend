import mongoose, { Schema } from 'mongoose';

const productSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    images: [{
        type: Object,
        require: true
    }]    
}, {
    timestamps: true
})

export default mongoose.model('Product', productSchema);