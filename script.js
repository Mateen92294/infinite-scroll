const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];

// unsplash API
const count = 30;
const apiKey = '6TtHxj4eDskqVVvRqRnSJLuyK3plXhMoKLN2ryAFCW4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imageLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements 
function setAttributes(element, attributes){
    for( const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// create elemenents for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded =0;
    totalImages = photosArray.length;

// run function for each object in photosArray
photosArray.forEach((photo) =>{
// create <a> to link a unsplash
const item = document.createElement('a');
setAttributes(item, {
href: photo.links.html,
target: '_blank',
});

// create <img> for a photo
const img = document.createElement('img');
setAttributes(img,{
src: photo.urls.regular,
alt: photo.alt_description,
title: photo.alt_description,
});

// Event listener, check when each is finished loading
img.addEventListener('load', imageLoaded); 

// put <img> inside <a> then put both inside image container element
item.appendChild(img);
imageContainer.appendChild(item);
});
}

// get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){

    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
});

// on load
getPhotos();