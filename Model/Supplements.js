import mongoose from 'mongoose';

const SupplementSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlenght: [3, 'Name must be at least 3 characters long'],
        maxlenght: [20, 'Name must be at most 50 characters long'],
    },
    category: {
        type: String, 
        required: true,
        enum: ['Protein', 'Vitamins', 'Minerals', 'Amino Acids','Herbal Supplements', 'Pre-workout', 'Supplements' ],
    },
    price: {
        type: Number, 
        required: true,
        min: [1, 'Price must be greater than or equal to 1'],
    },
        
    stock: 
    {type: Number, 
    default: 0,
    min: [0, 'Stock cannot be negative'],

    },
    description: {
        type: String, 
        default: '',
    },
    createdAt: {type: Date, default: Date.now},
});


const Supplement = mongoose.model('Supplement', SupplementSchema);
export default Supplement;