export interface City {
    postcode: number,
    city: string
 }
    
export interface Member {
    first_name: string,
    last_name: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    postcode: City 
}

export interface Trainer {
    first_name: string,
    last_name: string,
    user_name: string,
    birthday: Date | string,
    street: string,
    house_number: string,
    postcode: City 
}
    
export interface Sport {
    name: string
}

export interface Coaching {
    sport: Sport,
    trainer: Trainer
}