import mongoose, { Schema, Document } from 'mongoose'
export interface IProduct extends Document {
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const ProductSchema: Schema = new Schema<IProduct>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: {
    rate: { type: Number, required: true },
    count: { type: Number, required: true },
  },
})
const Product = mongoose.model<IProduct>('Product', ProductSchema)
export default Product
