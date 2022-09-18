const loadPhones = async(searchText, phoneLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, phoneLimit)
}



// display phone
const displayPhones = (phones, phoneLimit) => {
    const phonecontainer = document.getElementById('phone-container');
    phonecontainer.innerText= '';
    // display only 10
    if(phoneLimit && phones.length > 10){

        phones = phones.slice(0, 9);
        const showAllBtn = document.getElementById('show-all-btn');
        showAllBtn.classList.remove('d-none');
    }
    else{
        const showAllBtn = document.getElementById('show-all-btn');
        showAllBtn.classList.add('d-none');
    }

// no phone found
const noPhone = document.getElementById('no-found')
 if(phones.length === 0){
    noPhone.classList.remove('d-none')
}
else{
    noPhone.classList.add('d-none')
}

    phones.forEach(phone => {
        const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML=`
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <button onclick ="phoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
        </div>
    `;
    phonecontainer.appendChild(div)
    });
// stop spinner
toggleSpinner(false);
}
const prosessToDisplay = (phoneLimit) => {
    // start spinner
    toggleSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    loadPhones(searchText, phoneLimit)
}

// Search with button
document.getElementById('btn-search').addEventListener('click', function(){
    prosessToDisplay(10);
})

// Search with enter key
document.getElementById('input-field').addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        prosessToDisplay(10);
    }
})

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if(isLoading){
        spinnerSection.classList.remove('d-none');
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}
document.getElementById('show-all').addEventListener('click', function(){
    prosessToDisplay();
})

const phoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetail(data.data)

}
const displayPhonesDetail = detail => {
    console.log(detail)
    const title = document.getElementById('phoneDetailModalLabel');
    title.innerText = detail.name
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.innerText = `
    Release Date: ${detail.releaseDate ? detail.releaseDate : 'NO release date found'}
    Main Features: ${detail.mainFeatures.storage}
    chip set: ${detail.mainFeatures.chipSet}
    display size: ${detail.mainFeatures.displaySize}
    memory: ${detail.mainFeatures.memory}
    `;


    // console.log(title);
}
loadPhones('apple');
