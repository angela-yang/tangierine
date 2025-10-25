export const getMessages = (req, res) => {
  res.json({ message: "Get messages" });
};

export const sendMessage = (req, res) => {
  res.json({ message: "Message sent" });
};