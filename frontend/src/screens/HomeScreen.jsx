import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import { useGetBooksQuery } from '../slices/bookApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import BookCarousel from '../components/BookCarousel';

const HomeScreen = () => {
  const { pageNumber ,keyword} = useParams();
  const { data, isLoading, error } = useGetBooksQuery({
    pageNumber,
    keyword,
  });
  console.log(data)
  return (
      <>
       {!keyword ? (
        <BookCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <h1>Latest Books</h1>
        <Row>
          {data.books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
        <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
        </>
      )}
      </>  
  );
};
  
export default HomeScreen;