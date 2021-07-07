const getRandomDirection = ()=> (Math.floor(Math.random() * 2) || -1);

export const getRandomVelocity = ()=>{
    const multiplyFactor = 5;
    const lowerBound = 5;
    return (Math.random() * multiplyFactor + lowerBound) * getRandomDirection();
}

export const generateRandomBallId = ()=> {
    const multiplyFactor = 1000;
    return Math.random() * multiplyFactor;
}

export const getRadiusWithOffset = ()=> {
    const multiplyFactor = 30;
    const lowerBound=10;
    return lowerBound+Math.random()*multiplyFactor;
}