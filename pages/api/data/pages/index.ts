import withSession from "../../../../lib/session";
import Page from "../../../../models/page";

export default withSession(async (req, res) => {
  try {
    const { search } = req.query;
    let result = await Page.searchPage(search);

    if (result) {
      if (req.query.count) {
        result = result.slice(
          0,
          result.length > req.query.count ? req.query.count : result.length
        );
      }
      return res.send(result);
    } else return res.status(404).send();
  } catch (err) {
    return res.status(400).send();
  }
});
