export function getTimeOfTheDay(){
    const hour = new Date().getHours()

    if(hour >= 0 && hour <= 11) return 'morning'
    else if(hour >= 12 && hour <= 16) return 'afternoon'
    else if(hour >= 17 && hour <= 24) return 'evening'
}

export function shuffleArray(array){
    array.sort(() => Math.random() - 0.5);

    return array
}
