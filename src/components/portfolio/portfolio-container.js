import React, { Component } from "react";

import PortfolioItem from "./portfolio-item"

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            data: [
                {title: "Quip" },
                {title: "Eventbrite" },
                {title: "Ministry Safe" },
                {title: "SwingAway" }
            ]
        };
    };

    portfolioItems() {

        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} />;
        })
    }
    
    render() {
        return (
            <div>
                <h2>Portfolio Items go here....</h2>

                {this.portfolioItems()}

            </div>
        );
    }
}