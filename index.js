const fetchFromApi = () =>{
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url).then(res => res.json()).then(data => showCategories(data))
}

const showCategories = data =>{
    const categories = data.data.news_category
    const categoriesContainer = document.getElementById("categories-container")
    categories.forEach(category => {
        categoriesContainer.innerHTML +=`<a class="p-4 hover:bg-blue-500 rounded-md text-white" href="#" onclick="fetchCategory('${category.category_id}', '${category.category_name}')">${category.category_name}</a>`
    });
    console.log(data);
}

const fetchCategory = (data, name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${data}`
    fetch(url).then(res => res.json()).then(data => showAlert(data, name))
    
}

const showAlert = (data, name) =>{
    const newsCount = data.data.length;
    const newsTitle = name;
    const alertContainer = document.getElementById('alert-container')
    alertContainer.innerHTML =`
    <div class="alert rounded-md">
    <div>
      <span class="font-bold">${newsCount}</span> news founded in <span class="font-bold">${newsTitle}</span>
    </div>
  </div>
    `
    showNewsCards(data.data);
}

const showNewsCards = data =>{
    console.log(data)
    const cardContainer = document.getElementById('news-card-section');
    cardContainer.innerHTML=``
    data.forEach(news => {
        const {category_id, details, image_url, rating, thumbnail_url, title, total_view, _id} = news;
        const {img, name, published_date} = news.author;
        // console.log(details);
        cardContainer.innerHTML +=`
        <div class="card lg:card-side bg-base-100 border my-3">
        <figure class="p-4">
          <img class="rounded-lg" src="${image_url}" alt="Album" />
        </figure>
        <div class="card-body flex flex-col justify-between">
          <div class="card-upper-section">
            <h2 class="card-title">${title}</h2>
            <p>${details.slice(0, 200)}...</p>
          </div>
          <div class="card-lower-section flex justify-between items-center">
            <div class="flex gap-2 items-center">
              <img
                class="w-10 rounded-full"
                src="${img}"
                alt=""
              />
              <div>
                <h3 class="font-semibold">${name}</h3>
                <p>${published_date}</p>
              </div>
            </div>
            <div>
              <h3 class="font-bold">${total_view}</h3>
            </div>
            <div>
              <h3
                class="btn border-none bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Details
              </h3>
            </div>
          </div>
        </div>
      </div>
        `
    });
}