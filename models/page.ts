import "firebase/firestore";
import firebase from "firebase/app";
import initFirebase from "../lib/initFirebase";

export default class Page {
  public title: string;

  public content: string;

  public category?: string;

  public UIDfirebase?: string;

  private timestamp?: Date;
  public get getTimestamp(): Date {
    return this.timestamp;
  }
  private setTimestamp() {
    this.timestamp = new Date();
  }

  public constructor(
    title: string,
    content: string,
    category?: string,
    UIDfirebase?: string,
    timestamp?: Date
  ) {
    this.title = title;
    this.content = content;
    this.category = category;
    this.UIDfirebase = UIDfirebase;
    this.timestamp = timestamp;
  }

  static get db() {
    return firebase.firestore().collection("Pages");
  }

  async addPage(): Promise<void> {
    this.setTimestamp();
    await initFirebase();
    await Page.db.doc().set(this.getPage);
  }

  get getPage(): Object {
    return {
      title: this.title,
      content: this.content,
      category: this.category,
      UIDfirebase: this.UIDfirebase,
      timestamp: this.timestamp,
    };
  }

  static async getPagesFromUID(UID: string) {
    await initFirebase();
    return (await Page.db.where("UIDfirebase", "==", UID).get()).docs.map(
      (doc) => {
        let result = doc.data();
        result.id = doc.id;
        return result;
      }
    );
  }

  static async searchPage(search: string) {
    await initFirebase();
    return (await Page.db.where("title", ">=", search || "").get()).docs.map(
      (doc) => {
        let result = doc.data();
        result.id = doc.id;
        return result;
      }
    );
  }

  static async getPageFromID(ID: string) {
    await initFirebase();
    return await (await this.db.doc(ID).get()).data();
  }

  static async deletePage(ID: string, UID: string) {
    await initFirebase();
    let result = await Page.getPageFromID(ID);
    if (result && result.UIDfirebase == UID) {
      this.db.doc(ID).delete();
    } else {
      throw "Error deleting";
    }
  }

  async modifyPage(ID: string, UID: string) {
    await initFirebase();
    let result = await Page.getPageFromID(ID);
    if (result && result.UIDfirebase == UID) {
      let page: any = this.getPage;
      page.modifiedAt = new Date();
      return await Page.db.doc(ID).update(page);
    } else {
      throw "Error modify";
    }
  }
}