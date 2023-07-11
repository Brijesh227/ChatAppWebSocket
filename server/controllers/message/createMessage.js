const Message = require('../../model/messageschema');

exports.createMessage = async function (message) {
  const { groupName, messageText, userName } = message;
  try {
    if (groupName && messageText && userName) {
      const newMessage = await Message.create({
        groupName,
        messageText,
        userName
      })
      console.log(`${newMessage} created sucessfuly`);
    }
  } catch (err) {
    throw new Error(err);
  }
}