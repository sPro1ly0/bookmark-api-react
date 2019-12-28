import React, { Component } from 'react';
import Bookmark from './Bookmark';

class BookmarksList extends Component {
    render() {
        const bookmarks = this.props.bookmarks.map((bookmark, i) => 
            <Bookmark {...bookmark} key={i} />
        )
        return (
            <div className="bookmarkList">
                {bookmarks}
            </div>
        );
    }
}

BookmarksList.defaultProps = {
    bookmarks: []
};

export default BookmarksList;