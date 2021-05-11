import withSession from "../../../lib/session";
import "firebase/auth";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
