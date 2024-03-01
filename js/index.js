const dynamicBtnContainer = document.getElementById('md-nav-parent');
const serverResValue = document.getElementById('server-response-value');
const categoryNames = document.getElementById('category-name');
const dynamicCardContainer = document.getElementById('dynamic-news-card-container');
const dataNotFound = document.getElementById('not-found-image');
const fetchCatagories = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    const newsCategory = data.data.news_category;
    displayDynamicBtn(newsCategory);
}
const displayDynamicBtn = (newsCategories) => {
    console.log(newsCategories);
    newsCategories.forEach(newsCategory => {
        const divForDynamicBtn = document.createElement('div');
        divForDynamicBtn.innerHTML = `
            <button class="btn" onclick="fetchDataByCategory('${newsCategory.category_id}', '${newsCategory.category_name}')">${newsCategory.category_name}</button>
        `
        dynamicBtnContainer.appendChild(divForDynamicBtn);
    });
}
fetchCatagories();
const fetchDataByCategory = async (categoryId, categoryName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    const newsInformations = data.data;
    const newsDataLength = newsInformations.length;
    serverResValue.textContent = 0;
    serverResValue.innerText = newsDataLength;
    categoryNames.innerText = categoryName || 'Category name';
    displayCategoriesData(newsInformations);
}
const displayCategoriesData = (categoriesData) => {
    dynamicCardContainer.textContent = ' ';
    if(categoriesData.length == 0){
        dataNotFound.classList.remove('hidden');
    }
    else{
        dataNotFound.classList.add('hidden');
    }
    categoriesData.forEach(element => {
        console.log(element);
        const createDynamicCard = document.createElement('div');
        createDynamicCard.classList = `card card-side bg-base-100 shadow-xl w-full`;
        createDynamicCard.innerHTML = `
            <figure><img src="${element.image_url}"
            class="w-96" alt="Movie" /></figure>
    <div class="card-body">
        <h2 class="card-title">${element.title}</h2>
        <p class="max-w-[826px]">${element.details}</p>
        <div class="flex justify-between items-center">
            <div class="card-actions justify-start">
                <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img src="${element.author.img}" />
                    </div>
                  </div>
                    
                </div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn text-blue-600 font-semibold"><i
                        class='bx bx-right-arrow-alt text-3xl'></i></button>
            </div>
        </div>
            `
            dynamicCardContainer.appendChild(createDynamicCard);
    });
}
fetchDataByCategory();