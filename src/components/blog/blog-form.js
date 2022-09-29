import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import RichTextEditor from '../forms/rich-text-editor';
import BlogFeaturedImage from './blog-featured-image';

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "",
            content: "",
            featured_image: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextEditorChange = this.handleTextEditorChange.bind(this);

        this.componentConfig = this.componentConfig.bind(this) ;
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                status: this.props.blog.status
            });
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post",
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1,
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({featured_image: file})
        }
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

        if (this.state.featured_image) {
            formData.append("portfolio_blog[featured_image]", this.state.featured_image);
          }

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

                <div className="image-uploaders">
                    <DropzoneComponent
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleFeaturedImageDrop()}
                    >
                    <div className='dx-message'>Featured Image</div>
                    </DropzoneComponent>
                </div>

                <button className="btn">Save</button>

            </form>

            
        )
    }

}