const User = require("../models/user");
const Friendship = require("../models/friendshipTogel");
module.exports.createFriendship = async function (req, res) {
  try {
    const friendId = req.query.user_id;

    const user = await User.findById(req.user.id);
    const hisFriend = await User.findById(friendId);

    //creating new friendship

    const newFriendship = await Friendship.create({
      from_user: user,
      to_user: hisFriend,
    });
    // newFriendship.populate("from_user to_user", "name id email");
    user.friendship.push(newFriendship);
    user.save();

    console.log("***user  ", user);
    console.log("***friendship  ", await Friendship.find({}));

    return res.status(200).json({
      message: "Now you're friends with Aakash",
      success: true,
      data: newFriendship,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const hisId = req.query.user_id;
    const user = await User.findById(hisId);

    const reqFriendship = await Friendship.find({
      from_user: req.user,
      to_user: user,
    });
    reqFriendship.remove();
    req.user.friendship.pull(hisId);

    return res.status(200).json({
      message: "Friends removed",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.allFriends = async function (req, res) {
  try {
    const allFriends = await Friendship.find({ from_user: req.user });

    return res.status(200).json({
      message: "List of friends for user id 5e33fc7c9cd14572518c16fa",
      success: true,
      data: { friends: allFriends },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/*
{
"message": "Now you're friends with Aakash",
    "success": true,
    "data": {
        "friendship": {
            "to_user": {
                "_id": "5e33fe05a4dbc0731a11a825",
                "email": "a@a.com",
                "name": "a"
            },
            "from_user": {
                "id": "5e33fc7c9cd14572518c16fa",
                "email": "thor@gmail.com",
                "name": "thor"
            }
        }
    }
}
 */
// 613b4848b9464a1790d501bc
// http://localhost:8000/friendship/create-friendship?user_id=613b4848b9464a1790d501bc
