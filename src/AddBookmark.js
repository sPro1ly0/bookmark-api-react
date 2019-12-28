import React, { Component } from 'react';
import './AddBookmark.css';

class AddBookmark extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: "",
            description: "",
            rating: 1
        };
    }

    titleChanged(title) {
        this.setState({
            title
        });
    }

    urlChanged(url) {
        this.setState({
            url
        });
    }

    descriptionChanged(description) {
        this.setState({
            description
        });
    }

    ratingChanged(rating) {
        this.setState({
            rating
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {title, url, description, rating} = this.state;
        const bookmark = {title, url, description, rating};
        const url='https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
        const options = {
            method: 'POST',
            body: JSON.stringify(bookmark),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer $2a$10$gXbWH/OZmwsSaPAq3R9QL..M9C3teLpvXlVkbrGpDUxQtkwwul1PO"
            }
        };

        fetch(url, options)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Something went wrong, please try again later.');
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    title: "",
                    url: "",
                    description: "",
                    rating: 1
                });
                this.props.handleAdd(bookmark);
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
            });

    }

    render() {
        const error = this.state.error
            ? <div className="error">{this.state.error}</div>
            : "";
        return (
            <div className="addbookmark">
                <h2>Add Bookmark</h2>
                {error}
                <form className="addbookmark__form">
                    <label htmlFor="title">Title:</label>
                    <input 
                        value={this.state.title}
                        onChange={e => this.titleChanged(e.target.value)}
                        type="text" 
                        name="title" 
                        id="title" 
                        placeholder="Title"/>
                    <label htmlFor="url">Url:</label>
                    <input 
                        value={this.state.url}
                        onChange={e => this.urlChanged(e.target.value)} 
                        type="text" 
                        name="url" 
                        id="url" 
                        placeholder="url"/>
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        value={this.state.description} 
                        onChange={e => this.descriptionChanged(e.target.value)}
                        name="description" 
                        id="description" 
                        placeholder="description"/>
                    <label htmlFor="rating">Rating: </label>
                    <input
                        value={this.state.rating}
                        onChange={e => this.ratingChanged(e.target.value)}
                        type="number"
                        name="rating"
                        id="rating"
                        min="1"
                        max="5"/>

                    <div className="addbookmark__buttons">
                        <button onClick={e => this.props.showForm(false)}>Cancel</button>
                        <button type="submit" >Save</button>
                    </div>  
                </form>
            </div>
        );
    }
}

export default AddBookmark;