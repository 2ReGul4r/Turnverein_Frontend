export interface City {
    postcode: number,
    city: string
 }
    
export interface Member {
    id: number,
    first_name: string,
    last_name: string,
    birthday: string,
    street: string,
    house_number: string,
    postcode: City
}

export interface Trainer {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    postcode: City,
    is_staff: boolean
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

export interface Participant {
    id: number,
    course: number | Course,
    member: Member,
}

export interface TrainerRegister {
    first_name: string,
    last_name: string,
    username: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    city: string,
    postcode: number,
    password: string,
  }