import React, { Component } from 'react';
import axios from "axios";

import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
   constructor() {
       super();
   
   this.state = {
       portfolioItems: []
   }
   
   this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
   this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this)


}

handleSuccessfulFormSubmission(portfolioItem) {
    //TODO
    //update the portfolio state
    //add the portfoliItem to thelist
    console.log("hello")
}

handleFormSubmissionError(error) {
    console.log('handleSuccessfulFormSubmissionError', error)
}

getPortfolioItems() {
axios.get('https://jcrundwell.devcamp.space/portfolio/portfolio_items' , {withCredentials: true
}).then(response => {
    console.log("response", response)
    this.setState ({
        portfolioItems: [...response.data.portfolio_items]
    })
}).catch(error => {
    console.log("error", error)

})

}
      

componentDidMount() {
        this.getPortfolioItems();
}
   
    render() {
        return(
            <div className="portfolio-manager-wrapper">
                <div className= "left-column-wrapper">

                <PortfolioForm 
                handleSuccessfulFormSubmission = {this.handleSuccessfulFormSubmission}
                handleFormSubmissionError = {this.handleFormSubmissionError}
                />

                </div>
                <div className= "right-column-wrapper">

                <PortfolioSidebarList data={this.state.portfolioItems} />
                

                </div>
                
            </div>
        )
    }
}


   
