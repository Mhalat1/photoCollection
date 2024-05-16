//Affichage photos

let photos
async function fetchPhotos() {
    try {
        const response = await fetch('https://photos-api-sepia.vercel.app/photos')
        const result = await response.json()
        photos = result
        console.log(photos)
    } catch (error) {
        console.error('Erreur:', error)
    }
    display();
    modification();
}
fetchPhotos();

let imageConteneur = document.getElementById("imageConteneur");
console.log(imageConteneur)
let photoDescription
 

function display() {
    imageConteneur.innerHTML = ''
    for (let i = 0; i < photos.length; i++) {
        photoUrl = photos[i].url;
        let photoDescription = photos[i].description;
        imageConteneur.innerHTML +=
            `
                <a data-fancybox="gallery" href="${photoUrl}"> 
                <img src= ${photoUrl}>
                </a>
                <input id="description" placeholder="${photoDescription}" oninput="modification()"></input>
                <div class="content photo-details">
                <button class="button is-danger" onclick="deletePhoto(${photos[i].id})">Delete</button>
                </div>
            `
            modification()
    }};
    function modification() {
        let inputValue = document.getElementById("description").value;
        let input = document.getElementById("description");
        console.log(input)
        console.log(inputValue)
    }

// Delete photo

function deletePhoto(photoId) {
    $.ajax({
        url: 'https://photos-api-sepia.vercel.app/' + `photos/${photoId}`,
        //on a la valeur de photoId grace à l'injection js dans le html quand on call deletePhoto
        type: 'DELETE',
        success: function () {
            fetchPhotos();
        },
        error: function (error) {
            console.error('Error deleting photo:', error);
        }
    });
}
// function callAPI(param1, param2) {
// console.log('OK', param1, param2);}
// const param2 = 11
// const param1 = 10
// callAPI(param2, param1)




async function searchPhotos() {
    let u = "https://photos-api-sepia.vercel.app/photos/search?description=";
    let input = document.getElementById("search").value;
    if(!input){
        return fetchPhotos()
    }

    console.log(input)
    let set = u + input
    try {
        const response = await fetch(set)
        const result = await response.json()
        photos = result
        console.log(photos)
    } catch (error) {
        console.error('Erreur:', error)
    }
    display();
}


