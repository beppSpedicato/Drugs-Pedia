import withSession from "../../../../../lib/session";
import Page from "../../../../../models/page";

export default withSession(async (req, res) => {
    const loggedUser = await req.session.get("user");
    if (!loggedUser) {
        return res.status(403).json({});
    }

    try {
        let result = await Page.getPagesFromUID(loggedUser.id);
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
    
})