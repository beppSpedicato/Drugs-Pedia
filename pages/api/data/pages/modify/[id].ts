import withSession from "../../../../../lib/session";
import Page from "../../../../../models/page";

export default withSession(async (req, res) => {
  const loggedUser = await req.session.get("user");
  if (!loggedUser) {
    return res.status(403).json({});
  }

  try {
    const { id } = req.query;
    const { title, content, category, timestamp } = req.body;
    let body = new Page(
      title,
      content,
      category,
      loggedUser.id,
      new Date(timestamp)
    );
    await body.modifyPage(id, loggedUser.id);
    res.send({});
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});
