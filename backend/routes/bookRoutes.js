import express from 'express';
const router = express.Router();
import { getBooks,getBookById,addBook,updateBook,deleteBook,createBookReview } from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBooks).post(protect, admin, addBook);
router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBook);
router.route('/:id/reviews').post(protect, createBookReview);

export default router;