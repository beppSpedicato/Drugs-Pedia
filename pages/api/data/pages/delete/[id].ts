import withSession from "../../../../../lib/session";
import Page from "../../../../../models/page";

export default withSession(async (req, res) => {
    const loggedUser = await req.session.get("user");
    if (!loggedUser) {
        return res.status(403).json({});
    }

    try {
        const { id } = req.query;
        await Page.deletePage(id, loggedUser.id);
        res.redirect("/profile");
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
    
})