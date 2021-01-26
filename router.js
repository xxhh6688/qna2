module.exports = app => {
    const answer = require("./answer.js");
    // comment
    app.post("/CheckDuplicate/", answer.checkDuplicate);
    app.post("/RememberContent/", answer.rememberContent);
    app.post("/UpdateContent/", answer.updateContent);
    app.post("/DeleteContent/", answer.deleteContent);
    app.post("/TranslateWord/", answer.translateWord);
};