// For carousels, arrow gets hidden when there are no more items to show in that scrolling direction
const toggleArrows = (list, prevArrow, nextArrow) => {
  const scrolledLeft = list.scrollLeft;

  if (scrolledLeft <= 5) {
    prevArrow.classList.add('hidden');
  }

  if (
    scrolledLeft > 5 &&
    scrolledLeft < list.scrollWidth - list.clientWidth - 5
  ) {
    prevArrow.classList.remove('hidden');
    nextArrow.classList.remove('hidden');
  }

  if (scrolledLeft >= list.scrollWidth - list.clientWidth - 5) {
    nextArrow.classList.add('hidden');
  }
};

// For cards carousel, the left and right cards in view gets transformed in order to simulate a 3D effect.
const simulate3dEffect = (arrowName, carouselName) => {
  const allItems = document.querySelectorAll(`.${carouselName} ul li`);
  const itemsArr = Array.from(allItems);
  const leftIndex = itemsArr.findIndex((el) => el.classList.contains('left'));
  const rightIndex = itemsArr.findIndex((el) => el.classList.contains('right'));

  const changeSideCards = (shiftValue) => {
    allItems[leftIndex]?.classList.remove('left');
    allItems[leftIndex + shiftValue]?.classList.add('left');
    allItems[rightIndex]?.classList.remove('right');
    allItems[rightIndex + shiftValue]?.classList.add('right');
  };

  arrowName === 'next' ? changeSideCards(1) : changeSideCards(-1);
};

// General Carousel
const handleCarousel = (carouselName, timeout, additionalEffects) => {
  const arrows = document.querySelectorAll(
    `.${carouselName} .arrow-container .arrow`
  );
  const prevArrow = document.querySelector(
    `.${carouselName} .arrow-container .arrow.prev`
  );
  const nextArrow = document.querySelector(
    `.${carouselName} .arrow-container .arrow.next`
  );
  const itemsList = document.querySelector(`.${carouselName} ul`);
  const item = document.querySelector(`.${carouselName} ul li`);
  let timer = null;

  const arrowClickHandler = (e) => {
    const arrowName = e.target.classList.contains('prev') ? 'prev' : 'next';
    // When arrow is clicked, scroll by one item width.
    // Direction depends on which arrow is clicked.
    const scrollValue =
      arrowName === 'next' ? item.clientWidth : -item.clientWidth;
    itemsList.scrollBy({
      top: 0,
      left: scrollValue,
      behavior: 'smooth',
    });

    // Additional effects are called here.
    if (additionalEffects) {
      additionalEffects.forEach((func) => func(arrowName, carouselName));
    }

    // Scrolling takes some time to complete, which would affect toggleArrows function.
    // So setTimeout is used to delay toggleArrows to get the correct scrollLeft value.
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      toggleArrows(itemsList, prevArrow, nextArrow);
    }, timeout);
  };

  arrows.forEach((arrowEl) =>
    arrowEl.addEventListener('click', arrowClickHandler)
  );
};

/*
Click on an card to download.
Since download attribute of anchor tag is not supported in IE or Edge(prior version 18),or in Safari (prior version 10.1),
I used window.open() as a workaround here.
*/
const handleCardsDownload = () => {
  const cards = document.querySelectorAll('.cards .cards-list .card');

  const download = (url) => {
    window.open(url);
  };

  const cardClickHandler = (e) => {
    const cardId = e.target.id;

    switch (cardId) {
      case 'card-1':
        download('https://via.placeholder.com/350x400?text=Card_1');
      case 'card-2':
        download('https://via.placeholder.com/350x400?text=Card_2');
      case 'card-3':
        download('https://via.placeholder.com/350x400?text=Card_3');
      case 'card-4':
        download('https://via.placeholder.com/350x400?text=Card_4');
      case 'card-5':
        download('https://via.placeholder.com/350x400?text=Card_5');
      case 'card-6':
        download('https://via.placeholder.com/350x400?text=Card_6');
      default:
        return;
    }
  };

  cards.forEach((card) => card.addEventListener('click', cardClickHandler));
};

const _main = () => {
  'use strict';

  handleCarousel('recipes-carousel', 300);
  handleCarousel('cards-carousel', 500, [simulate3dEffect]);
  handleCardsDownload();
};

_main();
