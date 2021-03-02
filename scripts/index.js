const popUpStart = document.querySelector('.popup-start');
const popUpCities = document.querySelector('.popup-cities');
const popUpTicket = document.querySelector('.popup-ticket');
const popUpBenefits = document.querySelector('.popup-benefits');
const cityButton = document.querySelector('.template-cities').content;
const citiesContent = popUpCities.querySelector('.popup-cities__content');
const citiesObj = {}
const popUpCitiesPrevious = popUpCities.querySelector('.popup-cities__previous');
const popUpCitiesNext = popUpCities.querySelector('.popup-cities__next');
let key = 0;
const cities = [
  {
    name: 'Южный Аралабад',
    rate: 'Скорый',
    price: '400',
    priceSoon: '600'
  },
  {
    name: 'Северный Аралабад',
    price: '380'
  },
  {
    name: 'Солнечное',
    price: '360'
  },
  {
    name: 'Лазурь',
    price: '340'
  },
  {
    name: 'Приморское',
    rate: 'Скорый',
    price: '320',
    priceSoon: '480'
  },
  {
    name: 'Ромашка',
    price: '300'
  },
  {
    name: 'Ласточкино',
    price: '285'
  },
  {
    name: 'Полянка',
    price: '270'
  },
  {
    name: 'Волнотёсы',
    price: '255'
  },
  {
    name: 'Вал',
    price: '240'
  },
  {
    name: 'Веснушкино',
    rate: 'Скорый',
    price: '225',
    priceSoon: '340'
  },
  {
    name: 'Земляничное',
    price: '210'
  },
  {
    name: 'Переверзеевка',
    price: '195'
  },
  {
    name: 'Ведуны',
    price: '180'
  },
  {
    name: 'Заячий мыс',
    price: '165'
  },
  {
    name: 'Нижний садок',
    price: '150'
  },
  {
    name: 'Верхний садок',
    price: '135'
  },
  {
    name: 'Погодное',
    price: '120'
  },
  {
    name: 'Волчки',
    price: '105'
  },
  {
    name: 'Николаевка',
    rate: 'Скорый',
    price: '95',
    priceSoon: '140'
  },
  {
    name: 'Николаево-1',
    price: '85'
  },
  {
    name: 'Голубое',
    price: '75'
  },
  {
    name: 'Вольница',
    price: '60'
  },
  {
    name: 'Чашечкино',
    price: '50'
  },
  {
    name: 'Горки',
    rate: 'Скорый',
    price: '40',
    priceSoon: '60'
  },
  {
    name: 'Весеннее',
    price: '30'
  }
];
const popupTicketCity = popUpTicket.querySelector('.popup-ticket__city');
const popupCityPreviousButton = popUpTicket.querySelector('.popup-cities__previous');
const popupTicketSoon = popUpTicket.querySelector('.popup-ticket-soon');
const popupTicketPassenger = popUpTicket.querySelector('.popup-ticket-passenger');
const popupTicketOne = popUpTicket.querySelector('.popup-ticket__one');
const popupTicketTwo = popUpTicket.querySelector('.popup-ticket__two');
const popupTicketOnePrice = popUpTicket.querySelector('.popup-ticket__one-price');
const popupTicketOneFullPrice = popUpTicket.querySelector('.popup-ticket__one-full-price');
const popupTicketRate = popUpTicket.querySelector('.popup-ticket__rate');
const popupTicketRadioInputPassenger = popUpTicket.querySelector('#passenger');
const popupTicketBenefits = popUpTicket.querySelector('.popup-ticket__benefits');
const popUpFormBenefits = document.forms.benefits;
const popupTicketBenefitText = popUpTicket.querySelector('.popup-ticket__benefit');
const benefit = {
  no: {
    passenger: 1,
    soon: 1
  },
  retiree: {
    passenger: 0.5,
    soon: 0.7
  },
  student: {
    passenger: 0.5,
    soon: 1
  },
  schoolboy: {
    passenger: 0.5,
    soon: 0.7
  },
  child: {
    passenger: 0.5,
    soon: 0.5
  }
};
const benefits = {
  no: 'нет',
  retiree: 'пенсионер',
  student: 'студент',
  schoolboy: 'школьник',
  child: 'ребёнок до 7 лет'
};
let soon = false;

cities.forEach(obj => {
  obj.benefit = benefit;
});

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

function handleClickOnPopUp(evt) {
  if (evt.currentTarget.classList.contains('popup')) {
    closePopUp(evt.currentTarget);
  }
}

function handleClickOnOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopUp(evt.target);
  }
}

function handleClickOnCity(evt) {
  if (evt.target.classList.contains('popup-cities__city')) {
    closePopUp(evt.currentTarget);
    popupTicketCity.textContent = evt.target.textContent;
    const soonRate = cities.find(item => item.name === evt.target.textContent);
    if (soonRate.rate) popupTicketSoon.classList.add('popup-ticket__passenger_active');
    else popupTicketSoon.classList.remove('popup-ticket__passenger_active');
    soon = false;
    addPrices();
    popupTicketRate.textContent = 'ПАССАЖИРСКИЙ';
    popupTicketRadioInputPassenger.checked = true;
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

function addOnePopUpTicketOneFull() {
  popupTicketOne.classList.toggle('popup-ticket__one-full_active');
  popupTicketTwo.classList.remove('popup-ticket__one-full_active');
}

function addTwoPopUpTicketOneFull() {
  popupTicketTwo.classList.toggle('popup-ticket__one-full_active');
  popupTicketOne.classList.remove('popup-ticket__one-full_active');
}

function clickOnRate(evt, rate){
  if (evt.target.classList.contains('popup-ticket__passenger')) {
    evt.target.querySelector('.popup-ticket__radio-input').checked = true;
  }
  popupTicketRate.textContent = rate;
  if (rate === 'СКОРЫЙ') soon = true;
  if (rate === 'ПАССАЖИРСКИЙ') soon = false;
  addPrices();
}

function addPrice(price) {
  popupTicketOnePrice.textContent = String(price);
  popupTicketOneFullPrice.textContent = String(price * 2);
}

function clickOnBenefit(evt){
  if (evt.target.classList.contains('popup-benefits__benefit')) {
    evt.target.querySelector('.popup-ticket__radio-input').checked = true;
  }
}

function addBenefit(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const benefitsInput = popUpFormBenefits.querySelectorAll('.popup-ticket__radio-input');
  benefitsInput.forEach(item => {
    if (item.checked) {
      popupTicketBenefitText.textContent = item.value;
      addPrices();
    }
  });
  closePopUp(popUpBenefits);
}

function addPrices() {
  const city = cities.find(item => item.name === popupTicketCity.textContent);
  const benefit = Object.keys(city.benefit).find(key => benefits[key] === popupTicketBenefitText.textContent);
  if (soon) addPrice(Math.floor(Number(city.priceSoon) * city.benefit[benefit].soon));
  else addPrice(Math.floor(Number(city.price) * city.benefit[benefit].passenger));
}


popUpStart.addEventListener('click', (evt) => {
  handleClickOnPopUp(evt);
  openPopUp(popUpCities);
});
popUpCitiesNext.addEventListener('click', goToTheNextPage);
popUpCitiesPrevious.addEventListener('click', goToThePreviousPage);
popUpCities.addEventListener('click', handleClickOnCity);
popupCityPreviousButton.addEventListener('click', () => {
  closePopUp(popUpTicket);
  openPopUp(popUpCities);
});
popupTicketOne.addEventListener('click', addOnePopUpTicketOneFull);
popupTicketTwo.addEventListener('click', addTwoPopUpTicketOneFull);
popupTicketSoon.addEventListener('click', (evt) => {
  clickOnRate(evt, 'СКОРЫЙ');
});
popupTicketPassenger.addEventListener('click', (evt) => {
  clickOnRate(evt, 'ПАССАЖИРСКИЙ');
});
popupTicketBenefits.addEventListener('click', () => openPopUp(popUpBenefits));
popUpBenefits.addEventListener('click', handleClickOnOverlay);
popUpFormBenefits.addEventListener('click', (evt) => clickOnBenefit(evt));
popUpFormBenefits.addEventListener('reset', () => closePopUp(popUpBenefits));
popUpFormBenefits.addEventListener('submit', addBenefit);
