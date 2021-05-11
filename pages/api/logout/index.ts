import withSession from "../../../lib/session";
import "firebase/auth";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    req.session.unset("user");
    await req.session.save();
  }
  res.redirect("/login");
});
