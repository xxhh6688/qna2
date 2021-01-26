const Answer = require("./answer.model.js");
var request = require('request');

exports.checkDuplicate = (req, res) => {
    let content = req.body.content;
    Answer.checkDuplicate(content, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

exports.rememberContent = (req, res) => {
    let content = req.body.content;
    Answer.rememberContent(content, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

exports.updateContent = (req, res) => {
    let id = req.body.id;
    let content = req.body.content;
    Answer.updateContent(id, content, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

exports.deleteContent = (req, res) => {
    let id = req.body.id;
    Answer.deleteContent(id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving comments."
            });
        else res.send(data);
    });
};

exports.translateWord = (req, res) => {
    let word = req.body.content;
    let postData = {
        q:`${word}`,
        from:'Auto',
        to:'Auto'

    };

    request.post(
        'https://aidemo.youdao.com/trans',
        { form: postData },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }
            else{
                res.status(500).send({
                    message:
                        error.message || "Some error occurred while retrieving comments."
                });
            }
        }
    );
};