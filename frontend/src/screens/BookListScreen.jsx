import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetBooksQuery,useAddBookMutation,useDeleteBookMutation } from '../slices/bookApiSlice';
import { toast } from 'react-toastify';

const BookListScreen = () => {
  const { data: books, isLoading, error, refetch } = useGetBooksQuery();
  const [deleteBook, { isLoading: loadingDelete }] = useDeleteBookMutation();

 const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteBook(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [addBook, { isLoading: loadingAddBook }] =  useAddBookMutation();
  const addBookHandler = async () => {
    if (window.confirm('Are you sure you want to add a new book?')) {
        try {
        await addBook();
        refetch();
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Books</h1>
        </Col>
        <Col className='text-end'>
          <Button className='btn-sm m-3' onClick={addBookHandler}>
            <FaPlus /> Add Book
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {loadingAddBook && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>PUBLISHER</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.name}</td>
                  <td>${book.price}</td>
                  <td>{book.category}</td>
                  <td>{book.publisher}</td>
                  <td>
                    <LinkContainer to={`/admin/book/${book._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(book._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* PAGINATE PLACEHOLDER */}
        </>
      )}
    </>
  );
};

export default BookListScreen;