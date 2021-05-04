import mongoose, { Document, Schema } from 'mongoose';
import { ImageInterface } from '../controllers/ImagesController';

export interface ProductInterface extends Document {
    title: string;
    category: string;
    value: number;
    images: Array<ImageInterface>;
    createdAt: Date;
    updateAt: Date;
}

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

export default mongoose.model<ProductInterface>('Product', productSchema);