import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookmarksContext from './BookmarksContext';
import config from './config';
import './AddBookmark/AddBookmark.css';

const Required = () => (
    <span className='UpdateBookmark__required'>*</span>
)

class EditBookmark extends Component {

    static contextType = BookmarksContext;

    static propTypes = {
        match: PropTypes.shape({
          params: PropTypes.object,
        }),
        history: PropTypes.shape({
          push: PropTypes.func,
        }).isRequired,
      };

    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1
    };

    componentDidMount() {
        const { bookmarkId } = this.props.match.params;
        fetch(config.API_ENDPOINT_LOCAL+`/${bookmarkId}`, {
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
        .then(responseData => {
            this.setState({
                id: responseData.id,
                title: responseData.title,
                url: responseData.url,
                description: responseData.description,
                rating: responseData.rating
            })
        })
        .catch(error => this.setState({ error }))
    }
    
    handleClickCancel = () => {
        this.props.history.push('/')
    };

    handleChangeTitle = e => {
        this.setState({ title: e.target.value })
    };
    
    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    };
    
    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    };
    
    handleChangeRating = e => {
        this.setState({ rating: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault();
        const { bookmarkId } = this.props.match.params;
        const { title, url, description, rating } = this.state;
        const bookmark = {
            title,
            url,
            description,
            rating
        };
        this.setState({ error: null });

        fetch(config.API_ENDPOINT_LOCAL + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(bookmark),
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer 80111649-9ada-4fc2-a945-1c31b0341692`
            }//${config.API_KEY}
          })
            .then(res => {
              if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
              this.resetFields(bookmark)
              this.context.updateBookmark(bookmark)
              this.props.history.push('/')
            })
            .catch(error => {
              this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
          id: newFields.id || '',
          title: newFields.title || '',
          url: newFields.url || '',
          description: newFields.description || '',
          rating: newFields.rating || '',
        })
    }

    

    render() {
        const { title, url, description, rating, error } = this.state;
        return (
            <section className='UpdateBookmark'>
                <h2>Edit a bookmark</h2>
                <form
                    className='UpdateBookmark__form'
                    onSubmit={this.handleSubmit}
                >
                <div className='UpdateBookmark__error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
                <div>
                    <label htmlFor='title'>
                        Title
                        {' '}
                        <Required />
                    </label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Great website!'
                        value= {title}
                        onChange ={this.handleChangeTitle}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='url'>
                        URL
                        {' '}
                        <Required />
                    </label>
                    <input
                        type='url'
                        name='url'
                        id='url'
                        placeholder='https://www.great-website.com/'
                        value={url}
                        onChange={this.handleChangeUrl}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'>
                        Description
                    </label>
                    <textarea
                        name='description'
                        id='description'
                        value={description}
                        onChange={this.handleChangeDescription}
                    />
                </div>
                <div>
                    <label htmlFor='rating'>
                        Rating
                        {' '}
                        <Required />
                    </label>
                    <input
                        type='number'
                        name='rating'
                        id='rating'
                        min='1'
                        max='5'
                        value={rating}
                        onChange={this.handleChangeRating}
                        required
                    />
                </div>
                <div className='UpdateBookmark__buttons'>
                    <button type='button' onClick={this.handleClickCancel}>
                        Cancel
                    </button>
                    {' '}
                    <button type='submit'>
                        Save
                    </button>
                </div>
            </form>
        </section>
        )
    }
};

export default EditBookmark;