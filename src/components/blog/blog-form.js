import React, { Component } from 'react';
import axios from 'axios';
import RichTextEditor from '../forms/rich-text-editor';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog_status: "",
            content: ""

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextEditorChange = this.handleTextEditorChange.bind(this);
    }

    handleTextEditorChange(content) {
        this.setState({
            content
        });
    }

    handleChange(event) {
        this.setState ({
            [event.target.name] : event.target.value
        })

    }

    handleSubmit(event) {
        axios.post(
        "https://jcrundwell.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        {withCredentials: true}
        ).then(response => {
            this.setState({
                title: "",
                blog_status: "",
                content: ""
            })
            this.props.handleSuccessfulFormSubmission(response.data.portfolio_blog);

        
        }).catch( error => 
            console.log("Blog Sumbit error", error))


        


        event.preventDefault();
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title)
        formData.append("portfolio_blog[status]", this.state.status)
        formData.append("portfolio_blog[content]", this.state.content)

        return formData;
    }

    
    render() {
        return (
            <form onSubmit={this.handleSubmit}
            className="blog-form">
                <div className="two-column">

                    <input
                    onChange={this.handleChange}
                    type="text"
                    name="title"
                    placeholder = "Blog Title"
                    value = {this.state.title}/>


                    <input
                    onChange={this.handleChange}
                    type="text"
                    name="blog_status"
                    placeholder = "Blog Status"
                    value = {this.state.blog_status}/>

                </div>

                <div className='one-column'>
                    <RichTextEditor 
                    handleTextEditorChange={this.handleTextEditorChange}/>
                </div>

                <button className="btn">Save</button>

            </form>

            
        )
    }

}