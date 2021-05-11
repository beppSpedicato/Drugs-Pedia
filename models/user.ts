import "firebase/firestore";
import firebase from "firebase/app";
import initFirebase from "../lib/initFirebase";

export default class User {
    public name: string;
    public email: string;
    public UIDFirebase?: string;

    public constructor(
        email: string,
        name: string,
        UIDFirebase?: string
    ) {
        this.name = name;
        this.email = email;
        this.UIDFirebase = UIDFirebase
    }

    static get db() {
        return firebase
            .firestore().collection("Users");
    } 

    async addUser(): Promise<void> {
        await initFirebase();
        await User.db
            .doc(this.UIDFirebase)
            .set(this.getUser)
    } 

    get getUser(): Object {
        return {
            name: this.name,
            email: this.email,
            UIDfirebase: this.UIDFirebase
        }
    }

    static async getOneFromUID(UID: string) {
        await initFirebase();
        return await (await this.db.doc(UID).get()).data();
    }
}