import withSession from "../../../../../lib/session";
import Page from "../../../../../models/page";

export default withSession(async (req, res) => {
    const loggedUser = await req.session.get("user");
    if (!loggedUser) {
        return res.status(403).json({});
    }

    try {
        const { title, content, category } = req.body
        let page: Page = new Page(title, content, category, loggedUser.id);
        await page.addPage();
        return res.send({ok: true});
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
    
})