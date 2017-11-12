# Project: **techGine** -- Tech Product Review Search Aggregate

![techGine](assets/images/techGinelogo.png)

## Contents:
* [Team Members](#team-members)
* [Project Description](#project-description)
* [Project Design](#project-design)
* [APIs in Use](#apis-in-use)
* [Project Task Breakdown](#project-task-breakdown)
___

## Team Members:
* Sadé Browne - GitHub Master
* Jenn Chu
* Mark Kazanski
* Alize Nguyen
* Nicholas Sladden - Project Manager

## Project Description:

Our techGine project provides a one-stop platform allowing users to research and compare electronic and tech products across an array of sources. Users can use the website to aggregate product searches and generate reviews at ease. Reviews include customer ratings from Best Buy, Walmart, and Amazon, as well as YouTube videos, news articles, and trending tweets from Twitter.

## Project Design:

### Mood Board
![Project Mood Board](assets/images/Moodboard-ProjectOne-01.png)

### WireFrame
![Project Main Page Wireframe](assets/images/wireframe-02.png)
![Project Review Page Wireframe](assets/images/productpage-01.png)

## APIs in Use:
* Best Buy API
* News API
* Twitter API
* Walmart API
* Youtube API

## Project Task Breakdown:

* **Web-page design and styling**: Alize (Nick as needed)
* **Best Buy API Javascript and UPC generation**: Mark
* **News API and Twitter API Javascript**: Sade
* **Walmart API and YouTube API Javascript**: Jenn
* **WebHose API Javascript**: Nick

## Code Notes
Propsed product object:
Product{
        name
        imageURL
        description
        releaseDate
        productRating
        reviewsNum
        UPC
    }

1. UPC from Walmart
2. Search by UPC on bestbuy
    populate object keys
3. Object is passed to Webhose

### Workaround for passing data between APIS
1. getUPC stored in firebase

2. when firebase.UPC changes
	a. call BestBuy
	b. call webhose