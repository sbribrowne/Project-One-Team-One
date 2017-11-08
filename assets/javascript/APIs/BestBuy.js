var BestBuyAPI = {
    firstProduct:{
        name:"",
        imageURL:"",
        description:"",
        releaseDate:"",
        productRating:"",
        reviewsNum:"",
        UPC:"",
    },
    searchProduct: function(searchQuery){
        var requestURL = `https://api.bestbuy.com/v1/products((search=${searchQuery})&customerReviewCount>=1)?apiKey=RRDFqF9yMBmlBXsaQx1TqHe6&sort=customerReviewCount.dsc&pageSize=1&format=json`; 
       
        $.ajax({
            url: requestURL,
            method: "GET"
        }).done(function(response) {
            BestBuyAPI.firstProduct.name = response.products[0].name;
            BestBuyAPI.firstProduct.imageURL = response.products[0].image;
            BestBuyAPI.firstProduct.description = response.products[0].longDescription;
            BestBuyAPI.firstProduct.releaseDate = response.products[0].startDate;
            BestBuyAPI.firstProduct.productRating = response.products[0].customerReviewAverage;
            BestBuyAPI.firstProduct.reviewsNum = response.products[0].customerReviewCount;
            BestBuyAPI.firstProduct.UPC = response.products[0].upc;  
                     
        });
        return BestBuyAPI.firstProduct;
    },
};
