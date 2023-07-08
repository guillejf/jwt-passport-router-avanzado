import express from 'express';

export const advancedRouter = express.Router();

function validateWord(word) {
  var regex = /^[a-zA-Z]+$/;
  return regex.test(word);
}

advancedRouter.param('word', async (req, res, next, word) => {
  if (validateWord(word)) {
    req.word = word;
    next();
  } else {
    return res.send('algo salio mal');
  }
});

advancedRouter.get('/:word', (req, res) => {
  return res.send('word es igual a: ' + req.word);
});

advancedRouter.post('/:word', (req, res) => {
  return res.send('word es igual a: ' + req.word);
});
advancedRouter.put('/:word', (req, res) => {
  return res.send('word es igual a: ' + req.word);
});
advancedRouter.delete('/:word', (req, res) => {
  return res.send('word es igual a: ' + req.word);
});
