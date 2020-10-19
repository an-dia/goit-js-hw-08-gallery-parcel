import "./sass/main.scss";

import images from "./js/gallery-items";
// console.log(images);
// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>
const refs = {
  imagesList: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  bigImage: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  backdrop: document.querySelector(".lightbox__overlay"),
};

const imagesGallery = createImageGallery(images);

refs.imagesList.insertAdjacentHTML("beforeend", imagesGallery);

refs.imagesList.addEventListener("click", onOpenModal);
refs.btnClose.addEventListener("click", onCloseModal);
refs.backdrop.addEventListener("click", onCloseBackdropClick);

//Рендерит разметку галереи
function createImageGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}
let img;
//Открывает модалку с большим изображением
function onOpenModal(evt) {
  // console.log(evt.target)
  evt.preventDefault();
  //  if (!evt.target.classList.contains("gallery__image")) {
  //    return;
  //  }
  if (evt.target.nodeName !== "IMG") {
    return;
  }

  refs.lightbox.classList.add("is-open");
  refs.bigImage.src = evt.target.dataset.source;
  refs.bigImage.alt = evt.target.alt;


   document.addEventListener("keydown", onCloseEsc);
   document.addEventListener("keydown", onScrollingGalleryImages);
}

//Закрывает модалку при закрытии очищаее src lightbox__image
function onCloseModal() {
  document.removeEventListener("keydown", onCloseEsc);
  document.removeEventListener("keydown", onScrollingGalleryImages);
  refs.lightbox.classList.remove("is-open");
  onRemoveAttributesBiImage();
}

// Очищает  src и alt элемента img.lightbox__image
function onRemoveAttributesBiImage() {
  // refs.bigImage.removeAttribute('src');
  // refs.bigImage.removeAttribute('alt');
  refs.bigImage.src = "";
  refs.bigImage.alt = "";
}

//Закрытие по клику на бэкдроп
function onCloseBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

function onCloseEsc(evt) {
  const ESC_KEY_CODE = "Escape";
  if (evt.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}




// const imagesOriginal = images.map((item) => item.original)
//  console.log(imagesOriginal)

// Переключение картинок
function onScrollingGalleryImages(evt) {
  
  let imagesArray = [];
images.forEach((item) => {
  imagesArray.push(item.original);
  // console.log(imagesArray)
});
  let currentIndex = imagesArray.indexOf(refs.bigImage.src);  
    console.log(refs.bigImage.src)
  // console.log(currentIndex);
  const ARROW_LEFT = "ArrowLeft";
  const ARROW_RIGHT = "ArrowRight";
  if (evt.code === ARROW_LEFT) {
    if (currentIndex > 0) {
      refs.bigImage.src = imagesArray[currentIndex - 1]
    } else if (currentIndex <= 0) {
      currentIndex = imagesArray.length
      refs.bigImage.src = imagesArray[currentIndex - 1]
    }
     console.log(currentIndex)
   }

  if (evt.code === ARROW_RIGHT) {
       if (currentIndex < imagesArray.length - 1) {
     refs.bigImage.src = imagesArray[currentIndex + 1]
     } else currentIndex = -1 
     refs.bigImage.src = imagesArray[currentIndex + 1]

    // refs.bigImage.src = imagesArray[currentIndex + 1]
    // if (currentIndex + 1 > imagesArray.length ) {
    //   currentIndex = -1
    //   refs.bigImage.src = imagesArray[currentIndex + 1]
      
    // }     


    console.log(currentIndex)
}
    
  }

