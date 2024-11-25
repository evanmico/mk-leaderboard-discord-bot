import { Collection } from "discord.js";
import fsPromises from 'node:fs/promises';

//the dumb__filename and __dirname import to make them functional :|
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import domtoimage from 'dom-to-image';

const timesPath = path.join(__dirname, '../', 'data', 'times.json');

const readFile = async () => {
    try {
        const times = await fsPromises.readFile(timesPath, { encoding: 'utf8' });
        console.log(times);
        return times;
    } catch (err) {
        console.error(err.message);
    }
    
}
const writeFile = async (timesObj) => {
    try {
        await fsPromises.writeFile(timesPath, JSON.stringify(timesObj));
    } catch (err) {
        cnsole.error(err.message);
    }
}
const times = JSON.parse(await readFile());

console.log(times);

//const times = await import(join(__dirname, "data", "times.json"));
const timesCol = new Collection;
console.log(times[0].pos);
times.map((time) => (timesCol.set(time.pos, time)));
console.log(timesCol);
console.log(timesCol.lastKey());
const returnTime = () => {

}

const addTime = (timeObj) => {
    const { player, track, time } = timeObj;
    timesCol.set(timesCol.lastKey(), timeObj);
}

const createLeaderboard = (timeObj) => {
    let parentDiv = document.createElement('div');

    let tableElement = document.createElement('table');
    tableElement.setAttribute('id', 'leaderboard');
    /*
    for(const time in timeObj) {
        let rowElement = document.createElement('tr');
        rowElement.classList.add('row');
        tableElement.append(rowElement);

    }*/
    let rowElement = document.createElement('tr');
    rowElement.classList.add('row');
    let headerElement = document.createElement('th');
    headerElement.classList.add('header');
    let valElement = document.createElement('td');
    valElement.classList.add('value')
    for(let i; i < 5; i++) {rowElement.append(headerElement)};
    rowElement.childNodes.map((childNode) => childNode.append('pos'));
}
