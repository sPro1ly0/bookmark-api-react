import React, { Component } from 'react';
import BookmarksList from './BookmarksList';
import './BookmarkApp.css';
import Fab from './Fab';

class BookmarkApp extends Component {
    render() {
        return (
            <div className="bookmarkApp">
                <h2>Bookmarks</h2>
                <BookmarksList bookmarks={this.props.bookmarks}/>
                <Fab />
            </div>
        );
    }
}

export default BookmarkApp;