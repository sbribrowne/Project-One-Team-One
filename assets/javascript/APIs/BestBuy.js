function searchBestBuy(searchQuery) {
    if (!searchQuery) 
        return Promise.reject("pass in UPC"); 

    //const requestURL = `https://api.bestbuy.com/v1/products((search=${searchQuery})&customerReviewCount>=1)?apiKey=RRDFqF9yMBmlBXsaQx1TqHe6&sort=customerReviewCount.dsc&pageSize=1&format=json`;
    const requestURL = `https://api.bestbuy.com/v1/products(upc=${searchQuery})?apiKey=RRDFqF9yMBmlBXsaQx1TqHe6&format=json`;
   
    return $.ajax({
        url: requestURL,
        method: "GET"
    }).done((response) => {
        return  {
            name: response.products[0].name,
            imageURL:  response.products[0].image,
            description: response.products[0].longDescription
        }
    });

   /* var firstProduct = {
        name: "",
        imageURL: "",
        description: "",
    };

    $.ajax({
        url: requestURL,
        method: "GET"
    }).done(function (response) {
        firstProduct.name = response.products[0].name;
        firstProduct.imageURL = response.products[0].image;
        firstProduct.description = response.products[0].longDescription;
    });
    
    return firstProduct;
    */
}