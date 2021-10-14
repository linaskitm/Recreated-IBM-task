const faker = require("faker");

const createFake = () => {
    
    let fakeData = faker.commerce.productName();
    return fakeData;
}

const createArray = (num = 10) => {
    return Array.from({length: num}, createFake)
}

module.exports = {createFake, createArray}