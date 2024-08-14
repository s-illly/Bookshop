import { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button,Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useGetBookDetailsQuery } from '../slices/bookSlice';

const BookScreen = () => {
    const { id: bookId } = useParams();

    const {
      data: book,
      isLoading,
      error,
    } = useGetBookDetailsQuery(bookId);

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
      dispatch(addToCart({ ...book, qty }));
      navigate('/cart');
    };

  return (
    <>
        <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
        <Row>
        <Col md={5}>
        <Image src={book.image} alt={book.name} fluid />
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{book.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={book.rating}
                text={`${book.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${book.price}</ListGroup.Item>
            <ListGroup.Item>Description: {book.description}</ListGroup.Item>
        </ListGroup>

        </Col>
        <Col md={3}>
        <Card>
        <ListGroup variant='flush'>
        <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${book.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {book.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

                  {/* Qty Select */}
                  {book.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(book.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={book.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
        </ListGroup>
        </Card>
        </Col>
      </Row>
      </>
      ) }
    </>
  )
}

export default BookScreen