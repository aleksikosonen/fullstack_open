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
    const periodLength = trainingWeek.length
    const trainingDays = trainingWeek.filter(dailyHours => dailyHours > 0).length
    const trainingHours = trainingWeek.reduce((dayTotal, hours) => dayTotal + hours )

    /* Initially went with this as this would be the recommendation
    fixed to suit the exercise model answer, where target is target hours

    // The department recommends training 150 minutes of moderate aerobic activity per week
    const trainingMinutes = trainingHours * 60
    const dailyAverage = trainingMinutes / periodLength
    const suggestedDailyAverage = 150 / 7 */


    let rating = 0
    let ratingDescription = 'initial'
    console.log(trainingHours)
    const highHours = 14
    const mediumHours = 7

    if (trainingHours > highHours) {
        rating = 3
        ratingDescription = 'great'
    } else if (trainingHours > mediumHours) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else  {
        rating = 1
        ratingDescription = 'not too great'
    }

    const average = trainingHours / periodLength
    const success = average >= target

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
