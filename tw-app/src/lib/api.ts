// src/lib/api.ts

const dummyRecommendedCities = [
    'Paris',
    'New York',
    'Tokyo',
    'Sydney',
    'London'
];

const dummyCityData = {
    name: 'Paris',
    image: 'https://example.com/paris.jpg',
    description: 'Paris is the capital city of France, known for its art, fashion, and culture.',
    weather: [
        { month: 'January', grade: 'Cold', comment: 'It is generally cold and rainy.' },
        { month: 'February', grade: 'Cold', comment: 'Cold weather continues.' },
        { month: 'March', grade: 'Cool', comment: 'Starting to warm up.' },
        { month: 'April', grade: 'Mild', comment: 'Spring season, pleasant weather.' },
        { month: 'May', grade: 'Warm', comment: 'Perfect weather for sightseeing.' },
        { month: 'June', grade: 'Warm', comment: 'Warm and sunny, great for travel.' },
        { month: 'July', grade: 'Hot', comment: 'Hot and sometimes humid.' },
        { month: 'August', grade: 'Hot', comment: 'Hot and busy with tourists.' },
        { month: 'September', grade: 'Mild', comment: 'Mild and pleasant weather.' },
        { month: 'October', grade: 'Cool', comment: 'Cool and enjoyable.' },
        { month: 'November', grade: 'Cool', comment: 'Cooler weather, starting to get cold.' },
        { month: 'December', grade: 'Cold', comment: 'Cold and festive season.' },
    ]
};


export async function getRecCity(startMonth: string | null, endMonth: string | null) {
    // Simulate network delay
    // if start , end both null => return default city recommendation
    // if start, end both not null => return city recommendation by months
    await new Promise(resolve => setTimeout(resolve, 1000));
    return dummyRecommendedCities;
}

export async function getCity(city: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return dummyCityData;
}
