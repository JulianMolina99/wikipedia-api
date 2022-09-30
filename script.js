const input = document.getElementById('input-search');
const buttonClear = document.getElementById('button-clear');
const buttonSearch = document.getElementById('button-search');
const ApiEndpoint = 'https://en.wikipedia.org/w/api.php?';
const resultsItems = document.getElementById('searchResults');

const params = {
    origin: '*',
    format: 'json',
    action: 'query',
    prop: 'extracts|info|pageimages|pageterms',
    piprop: 'original',
    iiprop: 'url',
    inprop: 'url',
    exchars: 250,
    explaintext: true,
    exintro: true,
    generator: 'search',
    gsrlimit: 12,
};

const getInfo = async () =>{
    params.gsrsearch = input.value;
    try{
        const data = await axios.get(ApiEndpoint, { params });
        printResults(data.data.query.pages);
    } catch(error){
        printErrorSearch();
    }
};

const printResults = (data) => {
    let dataPages = Object.values(data);
    console.log(dataPages[0]);
    dataPages.map((element) => {
        if(element.hasOwnProperty('original')){
            resultsItems.innerHTML += `
                <article class="result">
                    <div class="result-description">
                        <header class="result-link-title">
                            <a href=${element.canonicalurl} target="_blank">
                                <cite class="cite-result">${element.canonicalurl}</cite>
                                <h2 class="title-result">${element.title}</h2>
                            </a>
                        </header>
                        <div class="result-text">
                            <p class="text-description">${element.extract}</p>
                        </div>
                    </div>
                    <div class="result-image">
                        <a href=${element.canonicalurl}>
                            <img src=${element.original.source} alt="" width="150">
                        </a>
                    </div>
                </article>

            `
        } else{ 
            resultsItems.innerHTML += `
        
                <article class="result">
                    <div class="result-description">
                        <header class="result-link-title">
                            <a href=${element.canonicalurl} target="_blank">
                                <cite class="cite-result">${element.canonicalurl}</cite>
                                <h2 class="title-result">${element.title}</h2>
                            </a>
                        </header>
                        <div class="result-text">
                            <p class="text-description">${element.extract}</p>
                        </div>
                    </div>
                </article>
        
        `
        }
    });
}

const printInvalidInput = () =>{
    resultsItems.innerHTML = `
        <div class="invalid-input">
            <div class="invalid-input-icon">
                <span class="material-symbols-outlined">
                    cancel
                </span>
            </div>
            <div class="search-off-message">
                <p class="text-description"> Please enter a valid search term</p>
            </div>
        </div>
    `;
};

const printErrorSearch = () =>{
    resultsItems.innerHTML = `
        <div class="search-off">
            <div class="search-off-icon">
                <span class="material-symbols-outlined">
                    search_off
                </span>
            </div>
            <div class="search-off-message">
                <p class="text-description"> Sorry, No results were found for your search</p>
            </div>
        </div>
    `;
}

input.addEventListener('input', ()=>{
    console.log(input.value);
    if(input.value !== ''){
        buttonClear.classList.remove('none');
    } else if(input.value === ''){
        buttonClear.classList.add('none');
    }
});

input.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && input.value === ""){
        printInvalidInput();
    } else if(e.key === 'Enter' && input.value !== ''){
        resultsItems.innerHTML = '';
        getInfo();
    }
})

buttonClear.addEventListener('click', ()=>{
    input.value = '';
    buttonClear.classList.add('none');
    resultsItems.innerHTML = '';
})

buttonSearch.addEventListener('click', () => {
    if(input.value === ""){
        printInvalidInput();
    } else{
        resultsItems.innerHTML = '';
        getInfo();
    }
    
});


