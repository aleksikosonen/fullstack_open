interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
}

const calculateExercises = (trainingWeek: number[], target: number): Result => {
    const periodLength = 0
    const trainingDays = 0
    const success = true
    const rating = 0
    const ratingDescription = 'initial'
    const average = 0 

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average 
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))