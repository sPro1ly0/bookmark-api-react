import React, { Component } from 'react';
import AddBookmark from './AddBookmark';
import BookmarkApp from './BookmarkApp';

const bookmarks = [
  {
    title:"Google",  
    url:"http://www.google.com",
    rating:"3",
    description:"No evil force"
  },
  {
    title:"Tumblr",  
    url:"http://www.tumblr.com",
    rating:"5",
    description:"May the force be with you"
  }
];

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AddBookmark />
        <BookmarkApp bookmarks={bookmarks}/>
      </div>
    );
  }
}

export default App;
