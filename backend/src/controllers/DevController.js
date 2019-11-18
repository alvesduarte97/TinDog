const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
      const { user } = req.headers;

      const loggedDev = await Dev.findById(user);

      const users = await Dev.find({
        $and: [
            { _id: { $ne: user } },
            { _id: { $nin:  loggedDev.likes  } },
            { _id: { $nin:  loggedDev.dislikes  } },

            //Uma segunda forma de atingir o mesmo resultado:
            // { _id: { $ne: user, $nin: loggedDev.likes, $nin: loggedDev.dislikes } }
        ],
      });

      return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const userExistis = await Dev.findOne({ user: username });

    if (userExistis) {
      return res.json(userExistis);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name: name,
      user: username,
      bio: bio,
      avatar: avatar
    });

    return res.json(dev);
  }
};
