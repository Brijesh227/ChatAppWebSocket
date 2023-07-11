const Message = require('../../model/messageschema');

exports.fetchMessage = async function (req,res) {
    const { groupName } = req.query;
    try {
      if (groupName) {
        const messageList = await Message.find({
          groupName: groupName
        })
        res.status(200).json(messageList);
      }
    } catch (err) {
      throw new Error(err);
    }
  }