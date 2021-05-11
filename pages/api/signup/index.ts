import withSession from "../../../lib/session";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../../../lib/initFirebase";
import User from '../../../models/user';
import "firebase/firestore";
import Router from "next/router";

export default withSession(async (req, res) => {
  const loggedUser = req.session.get("user");
  if (loggedUser) {
    res.status(403).json({});
  }

  initFirebase();

  const { email, password, name } = req.body;

  let user: User;
  try {
    user = new User(email, name);
  } catch (err) {
    return res.status(400).send({statusText: "signup/bodyError"})
  }

  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (response) => {
      user.UIDFirebase = response.user.uid;
      user.addUser()
        .then(() => res.send({ok: true}))
        .catch((error) => res.status(400).send({statusText: error.code}))
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({statusText: error.code});
    });
});
