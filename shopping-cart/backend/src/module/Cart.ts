import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart
