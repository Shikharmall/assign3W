export interface IUser {
    _id?: string
    name: string
    points?: number[]
    updatedAt?: Date
    createdAt?: Date
}

export interface AddUserScreenProps {
    totalUsers: number
    getAllUserDetailsFunc: (page: number, limit: number) => void
};


export interface UserData {
    status: number
    total: number
    userTopThree: IUser[]
    data: IUser[]
}