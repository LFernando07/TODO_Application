// This is handle method for exception controller by default
// It handles the request and response for the controller
export const handleException = fn => (req, res) => {
  fn(req, res).catch(error => res.status(500).json({ error: error.message }));
};