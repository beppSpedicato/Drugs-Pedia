import withSession from "../../../../lib/session";
import User from "../../../../models/user";

export default withSession(async (req, res) => {
    const loggedUser = await req.session.get("user");
    if (!loggedUser) {
        return res.status(403).json({});
    }

    const { email, name } = await User.getOneFromUID(loggedUser.id as string);
    res.send({
        email,
        name
    });
    
})