import withSession from "../../../../lib/session";
import Page from "../../../../models/page";

export default withSession(async (req, res) => {
  try {
    const { id } = req.query;
    let result = await Page.getPageFromID(id);
    if (result) return res.send(result);
    else return res.status(404).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});