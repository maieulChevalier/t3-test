import { atom } from "jotai";

const username = atom("");
const countryAtom = atom("Japan");
const citiesAtom = atom(["Tokyo", "Kyoto", "Osaka"]);
const mangaAtom = atom({
  DragonBall: 1984,
  OnePiece: 1997,
  Naruto: 1999,
});
