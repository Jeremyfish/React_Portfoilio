import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BlogItem from "../blog/blog-item";
import BlogModal from '../Modals/blog-model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from "axios";

class Blog extends Component {
  constructor() {
      super();

      this.state = {
        blogItems: [] ,
        totalCount : 0 , 
        currentPage : 0 , 
        isLoading : true ,
        blogModalOpen : false
      }

      this.getBlogItems = this.getBlogItems.bind(this);
      this.onScroll = this.onScroll.bind(this);
      window.addEventListener("scroll", this.onScroll, false);
      this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this)
  }


  handleSuccessfulNewBlogSubmission(blog) {
    this.setState ({
      blogModalOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    })
  }


    onScroll() {
      if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
        return;
      }
      
      if (window.innerHeight + document.documentElement.scrollTop  === (document.documentElement.offsetHeight + 17) ) {
        this.getBlogItems();
      }
    }
  
      handleNewBlogClick() {
        this.setState({
          blogModalOpen : true 
        });
      }

      handleModalClose () {
        this.setState({
          blogModalOpen : false
        });
      }

      getBlogItems() {
        this.setState({
          currentPage: this.state.currentPage + 1
        })

        axios.get(
          `https://jcrundwell.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}` ,
          { withCredentials : true}
        ).then(response => {
          this.setState({
            blogItems: this.state.blogItems.concat(
            response.data.portfolio_blogs) ,
            totalCount: response.data.meta.total_records , 
            isLoading : false
          });
        }).catch ( error => {
          console.log("GetBlogItemsError", error)
        });
      }

      componentDidMount() {
        this.getBlogItems();
      }

      componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll , false)
      }


  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
        return <BlogItem key={blogItem.id} blogItem = {blogItem} />
      })

      return(
      
      <div className="blog-container">
        <BlogModal 
        handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
        modalOpen = {this.state.blogModalOpen} 
        handleModalClose={this.handleModalClose}
        />

        <div className="new-blog-link">
          <a onClick={this.handleNewBlogClick}>
            <FontAwesomeIcon icon="plus-square" />
          </a>
        </div>
        <div className="content-container">
          {blogRecords}
        </div>

        {this.state.isLoading ? (
        <div className = "content-loader">
          <FontAwesomeIcon icon="spinner" spin />
        </div> ) : null }

      </div>
    );
  } 
}

export default Blog;