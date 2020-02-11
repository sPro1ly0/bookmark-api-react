import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import BookmarksContext from './BookmarksContext';
import Rating from './Rating/Rating';
import EditBookmark from './EditBookmark';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bkmk => 
      bkmk.id !== bookmarkId
      )
      this.setState({
        bookmarks: newBookmarks
      })
  }

  updateBookmark = updatedBookmark => {
    const newBookmarks = this.state.bookmarks.map(bookmark => 
      (bookmark.id === updatedBookmark.id)
        ? updatedBookmark
        : bookmark
    )
    this.setState({
      bookmark: newBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT_LOCAL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }

    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <Rating />
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              path='/edit/:bookmarkId'
              component={EditBookmark}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
