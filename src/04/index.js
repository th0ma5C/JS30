"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];
const people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];
// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const filteredInventors = inventors.filter((inventor) => {
    return inventor.year >= 1500 && inventor.year < 1600;
});
console.table(filteredInventors);
// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const inventorsName = inventors.map((inventor) => {
    return `${inventor.first} ${inventor.last}`;
});
console.log(inventorsName);
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const inventorsSortByBirth = inventors.sort((a, b) => {
    return a.year - b.year;
});
console.table(inventorsSortByBirth);
// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const livingInTotal = inventors.reduce((accumulated, currentValue) => {
    let life = currentValue.passed - currentValue.year;
    return accumulated += life;
}, 0);
console.log(livingInTotal);
// 5. Sort the inventors by years lived
const inventorsSortByLifetime = inventors.sort((a, b) => {
    return (b.passed - b.year) - (a.passed - a.year);
});
console.table(inventorsSortByLifetime);
const wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Boulevards_in_Paris&cmlimit=100&format=json&origin=*';
const fetchListOfBoulevards = (apiUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        const boulevards = data.query.categorymembers.map(item => item.title);
        // console.log(boulevards);
        return boulevards;
    }
    catch (error) {
        console.log('fetch data failed', error);
        return [];
    }
});
function nameContainDE(list) {
    const de = /de/;
    let result = list.filter((name) => {
        return de.test(name);
    });
    return result;
}
fetchListOfBoulevards(wikiQueryUrl).then((list) => {
    let DEList = nameContainDE(list);
    console.log(DEList);
}).catch((err) => {
    console.log('search de failed', err);
});
// 7. sort Exercise
// Sort the people alphabetically by last name
function getLastName(name) {
    const [firstName, lastName] = name.split(', ');
    return lastName;
}
people.sort((a, b) => {
    return getLastName(a).localeCompare(getLastName(b));
});
console.log(people);
// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
// let dataMap = new Map();
// data.forEach((item) => {
//     if (!dataMap.has(item)) {
//         return dataMap.set(item, 1)
//     }
//     let count = dataMap.get(item);
//     dataMap.set(item, count += 1)
// })
// console.log(dataMap);
const dataMap = data.reduce((map, key) => {
    if (!map[key]) {
        map[key] = 1;
    }
    else {
        map[key] += 1;
    }
    return map;
}, {});
console.log(dataMap);
