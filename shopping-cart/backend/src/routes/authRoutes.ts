import { Router, RequestHandler } from 'express'
import {
  login,
  signup,
  getProductList,
  addToCart,
  getCart,
  deleteCartItem,
} from '../controllers/authControllers'
import { verifyToken } from '../middleware/verifyToken'
const router = Router()

router.post('/login', login as any)
router.post('/signup', signup as any)
router.get('/getProductList', verifyToken as any, getProductList)
router.post('/addToCart', verifyToken as any, addToCart as any)
router.get('/getCart', verifyToken as any, getCart)
router.delete('/delete-cart-item/:productId', verifyToken as any, deleteCartItem as any)

export default router
