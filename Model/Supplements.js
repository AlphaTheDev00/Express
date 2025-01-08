import mongoose from 'mongoose';

const SupplementSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, default: 0},
    description: {type: String, default: ''},
    createdAt: {type: Date, default: Date.now},
});

export default mongoose.model('Supplement', SupplementSchema);