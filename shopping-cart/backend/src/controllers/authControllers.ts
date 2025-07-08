import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../module/User'
import Product from '../module/Product'
import Cart from '../module/Cart'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'password not match' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    })
    res.json({ accessToken: token })
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const userExists = await User.findOne({ email: email.toLowerCase() })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getProductList = async (req: Request, res: Response) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const { productId, action } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    let cart = await Cart.findOne({ userId: userId })
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [
          {
            productId: product._id,
            quantity: 1,
            price: product.price,
          },
        ],
        totalAmount: product.price,
      })
    } else {
      const itemIndex = cart.items.findIndex((item) => item.productId?.toString() === productId)
      if (itemIndex > -1) {
        const item = cart.items[itemIndex]
        if (action === 'increment') {
          item.quantity++
          cart.totalAmount += item?.price!
        } else if (action === 'decrement' && item.quantity >= 1) {
          item.quantity--
          cart.totalAmount -= item?.price!
        }
      } else {
        cart.items.push({
          productId: product._id,
          price: product.price,
          quantity: 1,
        })
        cart.totalAmount += product.price
      }
      await cart.save()
    }
    return res.status(200).json({ message: 'Cart updated successfully' })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return res.status(500).json({ message: 'Internal server error', error })
  }
}

export const getCart = async (req: Request, res: Response) => {
  try {
    const cartItems = await Cart.findOne({ userId: req.user?.id }).populate('items.productId')
    console.log('item in cart geted', cartItems)
    res.send(cartItems)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Internal server error', error })
  }
}

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    const productId = req.params.productId
    if (!productId) {
      return res.json(400).json(' product id not found ')
    }
    let cart = await Cart.findOneAndUpdate(
      { userId: userId },
      { $pull: { items: { productId: productId } } },
      { new: true },
    )
    if (!cart) {
      return res.json(404).json('cart not found')
    }
    const totalAmount = cart.items.reduce((acc, item) => {
      return acc + item.quantity * item.price
    }, 0)

    cart.totalAmount = totalAmount

    await cart.save()
    res.status(200).json({ message: 'cart item deleted success' })
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Internal server error', error })
  }
}
