import withSession from "../../../lib/session";
import initFirebase from "../../../lib/initFirebase";
import firebase from "firebase/app";
import "firebase/auth";

export default withSession(async (req, res) => {
  const { email } = await req.body;
  const { password } = await req.body;

  await initFirebase();

  try {
    const credentials = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const user = {
      isLoggedIn: true,
      id: credentials.user.uid,
      email: credentials.user.email,
      token: credentials.user.getIdToken,
    };
    req.session.set("user", user);
    await req.session.save();
    res.send({ ok: true });
  } catch (error) {
    res.status(500).json(error);
  }
});
