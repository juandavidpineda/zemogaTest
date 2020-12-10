export interface IUser {
    putUserToDB(userName: string, image: string, textDescription: string, title: string): any;
    getInfoUser(userName: string): any;
    getAllUsers(): any;
    getUserByUserName(userName: string): any;
}
