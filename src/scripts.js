// For carousels, arrow gets hidden when there are no more items to show in that scrolling direction
const toggleArrows = (list, prevArrow, nextArrow) => {
  const scrolledLeft = list.scrollLeft;
  console.log(scrolledLeft);
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
const addScrollEffect = (allCarouselItems, arrowName) => {
  const itemsArr = Array.from(allCarouselItems);
  const leftIndex = itemsArr.findIndex((el) => el.classList.contains('left'));
  const rightIndex = itemsArr.findIndex((el) => el.classList.contains('right'));

  const changeSideCards = (shiftValue) => {
    allCarouselItems[leftIndex]?.classList.remove('left');
    allCarouselItems[leftIndex + shiftValue]?.classList.add('left');
    allCarouselItems[rightIndex]?.classList.remove('right');
    allCarouselItems[rightIndex + shiftValue]?.classList.add('right');
  };

  if (arrowName === 'next') {
    changeSideCards(1);
  }

  if (arrowName === 'prev') {
    changeSideCards(-1);
  }
};

// Recipes carousel
const handleRecipesCarousel = () => {
  const arrows = document.querySelectorAll(
    '.recipes-carousel .arrow-container .arrow'
  );
  const prevArrow = document.querySelector(
    '.recipes-carousel .arrow-container .arrow.prev'
  );
  const nextArrow = document.querySelector(
    '.recipes-carousel .arrow-container .arrow.next'
  );
  const recipesList = document.querySelector('.recipes-carousel .recipes-list');
  const recipe = document.querySelector(
    '.recipes-carousel .recipes-list .recipe'
  );

  const arrowClickHandler = (e) => {
    const classList = e.target.classList;
    const scrollValue = classList.contains('next')
      ? recipe.clientWidth
      : -recipe.clientWidth;

    recipesList.scrollBy({
      top: 0,
      left: scrollValue,
      behavior: 'smooth',
    });

    let timer = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      toggleArrows(recipesList, prevArrow, nextArrow);
    }, 300);
  };

  arrows.forEach((arrowEl) =>
    arrowEl.addEventListener('click', arrowClickHandler)
  );
};

// Cards carousel
const handleCardsCarousel = () => {
  const arrows = document.querySelectorAll(
    '.cards-carousel .arrow-container .arrow'
  );
  const prevArrow = document.querySelector(
    '.cards-carousel .arrow-container .arrow.prev'
  );
  const nextArrow = document.querySelector(
    '.cards-carousel .arrow-container .arrow.next'
  );
  const cardsList = document.querySelector('.cards-carousel .cards-list');
  const card = document.querySelector('.cards-carousel .cards-list .card');

  const arrowClickHandler = (e) => {
    const allCards = document.querySelectorAll('.cards .cards-list .card');
    const classList = e.target.classList;
    const scrollValue = classList.contains('next')
      ? card.clientWidth
      : -card.clientWidth;

    const getArrowName = () => {
      if (classList.contains('prev')) {
        return 'prev';
      }

      if (classList.contains('next')) {
        return 'next';
      }
    };

    cardsList.scrollBy({
      top: 0,
      left: scrollValue,
      behavior: 'smooth',
    });

    addScrollEffect(allCards, getArrowName());

    let timer = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      toggleArrows(cardsList, prevArrow, nextArrow);
    }, 500);
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

  handleRecipesCarousel();
  handleCardsCarousel();
  handleCardsDownload();
};

_main();
