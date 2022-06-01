/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const container = document.querySelector('.info-container');
const imgContainer = document.querySelector('.img-container');
const searchInput = document.querySelector('.input');
const dataList = document.querySelector('.data-list');
const button = document.querySelector('.submit-button');

const fetch = (link, method, cb, data) => {
  const xhr = new XMLHttpRequest();
  // eslint-disable-next-line func-names
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb({
          error: false,
          status: xhr.status,
          response: JSON.parse(xhr.responseText),
        });
      } else {
        cb({
          error: true,
          status: xhr.status,
          response: JSON.parse(xhr.responseText).message,
        });
      }
    }
  };
  xhr.open(method, link);
  xhr.send(data);
};

const createElement = (
  element,
  attribute,
  attributeValue,
  parent,
  textCont
) => {
  const ele = document.createElement(element);
  ele.setAttribute(attribute, attributeValue);
  parent.appendChild(ele);
  ele.textContent = textCont;
};

const createCard = (imgUrl, name, capital, population, mapLink) => {
  createElement('img', 'src', imgUrl, imgContainer);
  createElement('p', 'class', 'official-name', container, `Name : ${name}`);
  createElement('p', 'class', 'capital', container, `Capital : ${capital}`);
  createElement(
    'p',
    'class',
    'population',
    container,
    `population : ${population} M`
  );
  createElement('a', 'href', mapLink, container, 'Click here for google maps');
};

searchInput.addEventListener('input', () => {
  fetch('/countries', 'GET', (data) => {
    const { response } = data;
    dataList.innerHTML = '';
    const filteredArr = searchInput.value
      ? response.filter((ele) =>
          ele.name.toLowerCase().startsWith(searchInput.value.toLowerCase())
        )
      : [];
    // eslint-disable-next-line function-paren-newline

    filteredArr.forEach((element) => {
      createElement('option', 'value', element.name, dataList);
    });
  });
});
const submitHandler = () => {
  container.textContent = '';
  imgContainer.textContent = '';
  fetch(
    '/send-data',
    'POST',
    (data) => {
      console.log(data);
      const { response } = data;
      const [information] = response;
      const name = information.name.official;
      const capital = information.capital[0];
      const { population } = information;
      const roundedPopulation = (population / 1000000).toFixed(1);
      const image = information.flags.png;
      const map = information.maps.googleMaps;

      createCard(image, name, capital, roundedPopulation, map);
    },
    searchInput.value
  );
  searchInput.value = '';
  dataList.textContent = '';
};

button.addEventListener('click', submitHandler);

searchInput.addEventListener('keydown', (e) => {
  // enter button
  if (e.keyCode === 13) submitHandler();
});
