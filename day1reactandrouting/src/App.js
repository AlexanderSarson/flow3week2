import React, { useState } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Prompt,
  useParams,
  useRouteMatch
} from "react-router-dom";
//import "./index.css";
import { Container, Button, TextField, AppBar, IconButton, Typography, Toolbar, makeStyles, Tab, Tabs } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App({ bookFacade }) {

  return (
    <div>
      <Header />

      <hr />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={bookFacade} />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={bookFacade} />
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={bookFacade} />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route >
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" component={NavLink} exact to="/" className={classes.HomeIcon} color="inherit" aria-label="home">
          <HomeIcon />
        </IconButton>
        <IconButton edge="start" component={NavLink} to="/products" color="inherit" >
        products
        </IconButton>
        <IconButton edge="start" component={NavLink} to="/add-book" color="inherit" >
        Add Book
        </IconButton>
        <IconButton edge="start" component={NavLink} to="/find-book" color="inherit" >
        Find Book
        </IconButton>
        <IconButton edge="start" component={NavLink} to="/company" color="inherit" >
        Company
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

function Home() {
  return (
    <h1>Home</h1>
  )
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();

  const books = [...bookFacade.getBooks()].map(({ id, title }) => (
    <li key={id}>
      {title}
      <NavLink to={`${url}/${id}`}>details</NavLink>
    </li>
  ));
  return (
    <React.Fragment>
      <h1>Product</h1>
      <ul>
        {books}
      </ul>

      <Switch>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

function Company() {
  return (
    <h1>Company</h1>
  )
}

function NoMatch() {
  return (
    <h1>No pages matches this path</h1>
  )
}

function AddBook({ bookFacade }) {
  const emptyBook = { title: "", info: "" }
  const [book, setBook] = useState(emptyBook)
  const [isBlocking, setIsBlocking] = useState(false);

  const handleChange = ({ target }) => {
    setBook({ ...book, [target.id]: target.value });
    if (document.querySelector("#title").value === "" && document.querySelector("#info").value === "") {
      setIsBlocking(false)
    } else {
      setIsBlocking(true);
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    bookFacade.addBook(book);
    setBook(emptyBook);
    setIsBlocking(false);
  }
  return (
    <React.Fragment>
      <form >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <label>Title:</label>
        <input id="title" placeholder="Add Title" value={book.title} onChange={handleChange} />
        <br />
        <label>Info:</label>
        <input id="info" placeholder="Add Info" value={book.info} onChange={handleChange} />
        <br />
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSubmit}>Save</Button>
      </form>
    </React.Fragment>
  )
}

function Details({ bookFacade }) {
  let { bookId } = useParams();
  const book = bookFacade.getBooks().find(({ id }) => bookId == id);
  return (
    <div>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
    </div>
  )
}

function FindBook({ bookFacade }) {
  const emptyBook = { id: undefined, title: "", info: "" }
  const [book, setBook] = useState(emptyBook)
  const [editBook, setEditBook] = useState(false);
  const [bookId, setBookId] = useState();

  const handleIdSubmit = e => {
    e.preventDefault();
    const book = bookFacade.findBook(bookId);
    if (book === undefined) {
      alert(`No book with ID ${bookId}`)
    } else {
      setBook(book)
    }
  }
  const handleIdChange = ({ target }) => {
    setBookId(target.value)
  }

  const handleBookSubmit = e => {
    e.preventDefault();
    bookFacade.addBook(book);
    setBook({ ...bookFacade.findBook(bookId) });
    setEditBook(false)
  }

  const handleCancelEditBook = () => {
    setEditBook(false);
    setBook({ ...bookFacade.findBook(bookId) });
  }

  const handleBookChange = ({ target }) => {
    setBook({ ...book, [target.id]: target.value });
  }

  const deleteBook = () => {
    bookFacade.deleteBook(book.id);
    setBook(emptyBook);
  }

  return (
    <Container maxWidth="xs">
      <form >
        <TextField size="small" id="id" type="number" label="Book ID" variant="outlined" onChange={handleIdChange} />
        <Button size="large" variant="outlined" color="primary" onClick={handleIdSubmit}>Find Book</Button>
      </form>
      <div>
        <ShowEditDeleteBook handleCancelEditBook={handleCancelEditBook} setEditBook={setEditBook} handleBookChange={handleBookChange} handleBookSubmit={handleBookSubmit} book={book} deleteBook={deleteBook} editBook={editBook} />
      </div>
    </Container>
  )
}

function ShowEditDeleteBook({ book, deleteBook, editBook, handleBookChange, handleBookSubmit, setEditBook, handleCancelEditBook }) {
  if (book.id === undefined) {
    return (
      <p></p>
    )
  } else if (!editBook) {
    return <ShowBook book={book} setEditBook={setEditBook} deleteBook={deleteBook} />
  } else {
    return <EditBook handleCancelEditBook={handleCancelEditBook} book={book} handleBookChange={handleBookChange} handleBookSubmit={handleBookSubmit} />
  }
}

function ShowBook({ book, setEditBook, deleteBook }) {
  return (
    <React.Fragment>
      <p>ID: {book.id}</p>
      <p>Title: {book.title}</p>
      <p>Info: {book.info}</p>
      <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={deleteBook}>Delete Book</Button>
      <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={() => setEditBook(true)}>Edit Book</Button>
    </React.Fragment>
  )
}

function EditBook({ book, handleBookChange, handleBookSubmit, handleCancelEditBook }) {
  return (
    <React.Fragment>
      <form >
        <label>ID:</label>
        <input id="title" readOnly value={book.id} />
        <br />
        <label>Title:</label>
        <input id="title" placeholder="Add Title" value={book.title} onChange={handleBookChange} />
        <br />
        <label>Info:</label>
        <input id="info" placeholder="Add Info" value={book.info} onChange={handleBookChange} />
        <br />
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleBookSubmit}>Save</Button>
        <Button variant="contained" color="secondary" startIcon={<CancelIcon />} onClick={handleCancelEditBook}>Cancel</Button>
      </form>
    </React.Fragment>
  )
}

export default App;
