const popUpStart = document.querySelector('.popup-start');
const popUpCities = document.querySelector('.popup-cities');
const popUpTicket = document.querySelector('.popup-ticket');
const cityButton = document.querySelector('.template-cities').content;
const citiesContent = document.querySelector('.popup-cities__content');
const citiesObj = {}
const popUpCitiesPrevious = document.querySelector('.popup-cities__previous');
const popUpCitiesNext = document.querySelector('.popup-cities__next');
let key = 0;

const cities = [
  {
    name: 'Южный Аралабад'
  },
  {
    name: 'Северный Аралабад'
  },
  {
    name: 'Солнечное'
  },
  {
    name: 'Лазурь'
  },
  {
    name: 'Приморское'
  },
  {
    name: 'Ромашка'
  },
  {
    name: 'Ласточкино'
  },
  {
    name: 'Полянка'
  },
  {
    name: 'Волнотёсы'
  },
  {
    name: 'Вал'
  },
  {
    name: 'Веснушкино'
  },
  {
    name: 'Земляничное'
  },
  {
    name: 'Переверзеевка'
  },
  {
    name: 'Ведуны'
  },
  {
    name: 'Заячий мыс'
  },
  {
    name: 'Нижний садок'
  },
  {
    name: 'Верхний садок'
  },
  {
    name: 'Погодное'
  },
  {
    name: 'Волчки'
  },
  {
    name: 'Николаевка'
  },
  {
    name: 'Николаево-1'
  },
  {
    name: 'Голубое'
  },
  {
    name: 'Вольница'
  },
  {
    name: 'Чашечкино'
  },
  {
    name: 'Горки'
  },
  {
    name: 'Весеннее'
  }
]

function createObjCities() {
  const objElement = (cities.length - cities.length % 15) / 15;
  for(let i=0; i<objElement; i++){
    citiesObj[i] = cities.slice(i * 15, (i + 1) * 15);
  }
  citiesObj[objElement] = cities.slice(objElement * 15, cities.length);
}

createObjCities();

function addCity(item) {
  const city = cityButton.querySelector('.button').cloneNode(true);
  city.textContent = item.name;
  return city;
}

let initialCityElements = citiesObj[key].map(addCity);
citiesContent.append(...initialCityElements);

function openPopUp(popup) {
  popup.classList.add('popup_opened');
}

function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}

function handleClickOnOverlay(evt) {
  if (evt.currentTarget.classList.contains('popup')) {
    closePopUp(evt.currentTarget);
  }
}

function handleClickOnCity(evt) {
  if (evt.target.classList.contains('popup-cities__city')) {
    closePopUp(evt.currentTarget);
    openPopUp(popUpTicket);
  }
}

function activeButton(button) {
  button.classList.remove('button_disabled');
}

function disabledButton(button) {
  button.classList.add('button_disabled');
}

function goToTheNextPage(){
  initialCityElements.forEach(item => item.remove());
  key += 1;
  initialCityElements = citiesObj[key].map(addCity);
  citiesContent.append(...initialCityElements);
  if (!citiesObj[key + 1]) {
    disabledButton(popUpCitiesNext);
    popUpCitiesNext.disabled = true;
  }
  if (key === 1) {
    activeButton(popUpCitiesPrevious);
    popUpCitiesPrevious.disabled = false;
  }
}

function goToThePreviousPage() {
  initialCityElements.forEach(item => item.remove());
  key -= 1;
  initialCityElements = citiesObj[key].map(addCity);
  citiesContent.append(...initialCityElements);
  if (!citiesObj[key - 1]) {
    disabledButton(popUpCitiesPrevious);
    popUpCitiesPrevious.disabled = true;
  }
  if (!key + 2) {
    activeButton(popUpCitiesNext);
    popUpCitiesNext.disabled = false;
  }
}


popUpStart.addEventListener('click', (evt) => {
  handleClickOnOverlay(evt);
  openPopUp(popUpCities);
});
popUpCitiesNext.addEventListener('click', goToTheNextPage);
popUpCitiesPrevious.addEventListener('click', goToThePreviousPage);
popUpCities.addEventListener('click', handleClickOnCity);
