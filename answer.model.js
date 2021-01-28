const sql = require("./db.js");

const Answer = function () {

};

Answer.checkDuplicate = (content, result) => {
    let searchStr = EncodeString(content.toString());
    searchStr = searchStr.replace(/'/g, "\'");
    let sqlStr = `SELECT id, content, MATCH(answer_search) AGAINST('${searchStr}') AS score FROM answer WHERE MATCH(answer_search) AGAINST('${searchStr}')`;

    try {
        sql.query(sqlStr, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, res);
        });
    }
    catch (error) {
        console.log(err);
        result(error, {});
    }
};

Answer.rememberContent = (content, result) => {
    let searchStr = EncodeString(content.toString());
    searchStr = searchStr.replace(/'/g, "\'");
    content = content.replace(/'/g, "\'");
    let sqlStr = `insert into answer (content,answer_search,createtime) values ('${content}', '${searchStr}',UNIX_TIMESTAMP())`;

    try {
        sql.query(sqlStr, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, {});
        });
    }
    catch (error) {
        result(error, {});
    }
    
};

Answer.updateContent = (id, content, result) => {
    let searchStr = EncodeString(content.toString());
    searchStr = searchStr.replace(/'/g, "\'");
    content = content.replace(/'/g, "\'");
    let sqlStr = `update answer set content='${content}', answer_search='${searchStr}' where id=${id}`;

    try {
        sql.query(sqlStr, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, {});
        });
    }
    catch (error) {
        result(error, {});
    }
};

Answer.deleteContent = (id, result) => {
    let sqlStr = `delete from answer where id=${id}`;

    try {
        sql.query(sqlStr, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            result(null, {});
        });
    }
    catch (error) {
        result(error, {});
    }
    
};

function EncodeString(content)
{
    let newString = "";
    let charArray = content.split('');
    for (var i = 0; i < charArray.length; i++)
    {
        if (IsUnicodeCharacter(charArray[i]))
        {
            var c = encodeURI(charArray[i]).replace(/%/g, "");
            newString = newString + c + " ";
        }
        else
        {
            newString += charArray[i];
        }
    }
    return newString;
}

function IsUnicodeCharacter(c)
{
    let MaxAnsiCode = 255;
    return c.charCodeAt() > MaxAnsiCode;
}

module.exports = Answer;