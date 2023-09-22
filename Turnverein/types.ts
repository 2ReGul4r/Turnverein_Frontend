export interface City {
    postcode: number,
    city: string
 }
    
export interface Member {
    id: number,
    first_name: string,
    last_name: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    postcode: City 
}

export interface Trainer {
    id: number,
    first_name: string,
    last_name: string,
    user_name: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    postcode: City 
}
    
export interface Sport {
    id: number,
    name: string
}

export interface Coaching {
    id: number,
    sport: Sport,
    trainer: Trainer
}

export interface CourseDate {
    id: number,
    course_length: number,
    days: number,
    hour: number,
    minute: number
}

export interface Course {
    id: number,
    sport: Sport,
    trainer: Trainer,
    date: CourseDate,
    hall: string
}