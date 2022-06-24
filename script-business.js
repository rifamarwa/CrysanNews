window.onload = function (){
    fetchBusinessNews();
};

function fetchBusinessNews(){
    let url = "https://api.currentsapi.services/v1/search?apiKey=cY8grff1pukauacSk8qFI2tvuDN8ZeYqfyy0O3kp9nqAplY1&country=id&category=business"
    fetch(url)
        .then(response => response.json())
        .then(function(allnews){
            allnews.news.forEach(function(news){
                displayNews(news);
                console.log(news);
            })
        })
}

function displayNews(news){
    let allNewsContainer = document.getElementById('newsContainer');

    // Untuk membuat kolom
    let column = document.createElement("div");
    column.classList.add('col');

    // Untuk membuat card container
    let card = document.createElement("div");
    card.classList.add('card');

    let cardBody = document.createElement("div");
    cardBody.classList.add('card-body');

    let cardBodyDesc = document.createElement("div");
    cardBodyDesc.classList.add('card-body-desc');

    let cardBodyImage = document.createElement('div');
    cardBodyImage.classList.add('card-body-img');

    let cardBodyHeader = document.createElement('div');
    cardBodyHeader.classList.add('card-body-header');

    let cardBodyAbstract = document.createElement("div");
    cardBodyAbstract.classList.add('card-body-abstract');

    let newsTitle = document.createElement('p');
    newsTitle.classList.add('card-desc-title');
    newsTitle.innerText = news.title;

    let newsCategory = document.createElement('p');
    newsCategory.classList.add('card-desc-category');
    newsCategory.innerText = `Category: ${news.category}`;

    let newsDate = document.createElement('p');
    newsDate.classList.add('card-desc-date');
    let date = new Date();
    newsDate.innerText = `Date: ${date.toDateString(news.published)}`;

    let newsImage = document.createElement('img');
    newsImage.classList.add('card-img-top');
    newsImage.srcset = news.image;

    let newsUrl = document.createElement('button');
    newsUrl.classList.add('btn', 'btn-url', 'btn-primary');
    newsUrl.innerText = 'Halaman Asli';

    let href = document.createElement('a');
    var href_attr = document.createAttribute('href');
    href_attr.value =  `${news.url}`;
    href.setAttributeNode(href_attr);

    let newsAbstract = document.createElement('p');
    newsAbstract.classList.add('card-desc-abstract');
    newsAbstract.innerText = news.description;

    if (newsImage != "None"){
        cardBodyDesc.classList.add('card-body-desc');
        cardBodyDesc.append(newsTitle, newsCategory, newsDate, newsAbstract);
        cardBodyImage.append(newsImage);
        cardBodyHeader.append(cardBodyImage, cardBodyDesc);
        cardBodyAbstract.append(newsAbstract);
        href.append(newsUrl);
        cardBody.append(cardBodyHeader, cardBodyAbstract, href);
    } else {
        cardBodyDesc.classList.add('card-body-desc-img-null');
        cardBodyDesc.append(newsTitle, newsCategory, newsDate, newsAbstract);
        cardBodyHeader.append(cardBodyDesc);
        cardBodyAbstract.append(newsAbstract);
        cardBody.append(cardBodyHeader, cardBodyAbstract);
    }

    card.appendChild(cardBody);
    column.appendChild(card);
    allNewsContainer.append(column);
}
