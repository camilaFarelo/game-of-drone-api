export default function (res, error) {
    if (!error) {
      res.status(400).json('Something went wrong with your request');
    } else {
      res.status(400).json(error);
    }
  }