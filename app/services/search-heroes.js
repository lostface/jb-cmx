import * as R from 'ramda';
// TODO temporary solution should be removed !!
import md5 from 'md5';
import { MARVEL_API_PRIVATE_KEY } from './_temp';

const MARVEL_API_PUBLIC_KEY = 'b06b10c45f5682a08c60afa345fcf261';
const MARVEL_API_BASE_URL = 'https://gateway.marvel.com';
const MARVEL_API_CHARACTERS_URL = `${MARVEL_API_BASE_URL}/v1/public/characters`;

export default function searchHeroes(searchText) {
  // TODO temporary solution, should be removed !!
  const ts = String(Date.now());
  const hash = md5(ts + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);
  const url = encodeURI(
    `${MARVEL_API_CHARACTERS_URL}?nameStartsWith=${searchText}&ts=${ts}&hash=${hash}&apikey=${MARVEL_API_PUBLIC_KEY}`
  );

  return fetch(url)
    .then(response => response.json())
    .then(result => result.data)
    .then(data => data.results)
    .then(R.map(toHero));
}

function toHero(raw) {
  return {
    id: raw.id,
    resourceURI: raw.resourceURI,
    name: raw.name,
    description: raw.description,
    thumbnail: toThumbnail(raw.thumbnail),
    urls: raw.urls,
    comics: toCollection(raw.comics),
    events: toCollection(raw.events),
    series: toCollection(raw.series),
    stories: toCollection(raw.stories),
  };
}

function toCollection(raw) {
  return {
    available: raw.available,
    items: raw.items,
  };
}

function toThumbnail(raw) {
  return `${raw.path}.${raw.extension}`;
}
