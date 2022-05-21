const DB = require('../helpers/DB');

const getInfoByEmail = async (email) => {
    const results = await new DB().ExecuteQuery(`select * from user where Email = '${email}'`);
    return results.length > 0 ? results[0] : false;
};

const getClients = async (userId) => {
    const results = await new DB().ExecuteQuery(`select * from user where Creator=${userId}`);
    return results.length > 0 ? results : null;
};

const removeClient = async (userId, id) => {
    const results = await new DB().ExecuteQuery(`delete from user where Creator=${userId} and id=${id}`);
    return results;
};

const addClient = async ({
    email,
    password,
    firstName,
    lastName, 
    creator = 0
  }) => 
{
    const query = `insert into user (Email, PasswordHash, FirstName, LastName, Creator) values ('${email}', '${password}', '${firstName}', '${lastName}', ${creator})`;
    const result = await new DB().ExecuteQuery(query);
    return {
        Id: result?.insertId,
    };
};

const addTest = async ({
    questions,
    name,
    creator
  }) => 
{
    const query = `insert into test (name, creatorid) values ('${name}', ${creator})`;
    const result = await new DB().ExecuteQuery(query);
    console.log(questions)

    for(let q of Object.values(questions)){
        const queryQ = `insert into question (question, testid) values ('${q.question}', ${result?.insertId})`;
        await new DB().ExecuteQuery(queryQ);
    }
    return {
        Id: result?.insertId,
    };
};

const editTest = async ({
    id,
    questions,
    name,
    creator
  }) => 
{
    const query = `update test set name='${name}' where id=${id}`;
    const result = await new DB().ExecuteQuery(query);
    
    await new DB().ExecuteQuery(`delete from question where testid=${id}`);
    console.log(questions)

    for(let q of Object.values(questions)){
        const queryQ = `insert into question (question, testid) values ('${q.question}', ${id})`;
        await new DB().ExecuteQuery(queryQ);
    }
    return {
        Id: result?.insertId,
    };
};

const removeTest = async (userId, id) => {
    await new DB().ExecuteQuery(`delete from question where testid=${id}`);
    await new DB().ExecuteQuery(`delete from test where id=${id} and creatorid = ${userId}`);
    return;
};

const getTests = async (userId, creator) => {
    if(creator == 0){
        const results = await new DB().ExecuteQuery(`select t.* from test t where t.creatorid=${userId}`);
        for(let r of results){
            const resultsQ = await new DB().ExecuteQuery(`select * from question where testid=${r.id}`);
            const resultsA = await new DB().ExecuteQuery(`select count(*) as assigns from assigntest where testid=${r.id}`);
            r['questions'] = resultsQ
            r['assigns'] = resultsA[0].assigns
        }
        return results.length > 0 ? results : null;
    }
    else{
        const results = await new DB().ExecuteQuery(`select t.*, (
                                                        case 
                                                            when a.status = 1 then 'To test'
                                                            when a.status = 2 then 'Review'
                                                            else 'Checked'
                                                        end
                                                    ) as status, a.comments from test t 
                                                    inner join assigntest a on a.testid = t.id
                                                    where a.userid = ${userId}`);
        for(let r of results){
            const resultsQ = await new DB().ExecuteQuery(`select * from question where testid=${r.id}`);
            r['questions'] = resultsQ
        }
        return results.length > 0 ? results : null;
    }
};

const assignTest = async (testId, clientId) => {
    await new DB().ExecuteQuery(`insert into assigntest (userid, testid) values (${clientId}, ${testId})`);
    return;
};

const getActiveTest = async (id) => {
    const results = await new DB().ExecuteQuery(`select t.* from test t where t.id=${id}`);
    for(let r of results){
        const resultsQ = await new DB().ExecuteQuery(`select * from question where testid=${r.id}`);
        r['questions'] = resultsQ
    }
    return results.length > 0 ? results[0] : null;
};

const answerActiveTest = async (userId, creatorId, testId, answers) => {
    await new DB().ExecuteQuery(`update assigntest set status=2 where testid=${testId} and userid=${userId}`);
    for(let a of answers){
        await new DB().ExecuteQuery(`insert into marks (creatorid, testid, questionid, mark) values (${creatorId}, ${testId}, ${a.id}, ${a.answer})`);
    }
    return;
};

const clientTests = async (userId) => {
    const results = await new DB().ExecuteQuery(`select a.id as assignId, a.status, t.*, sum(m.mark) as totalMark from test t 
                                                inner join assigntest a on a.testid = t.id
                                                inner join question q on q.testid=t.id
                                                inner join marks m on m.questionid=q.id
                                                where a.userid = ${userId}`);
    for(let t of results){
        const resultsQ = await new DB().ExecuteQuery(`select q.*, m.mark from test t 
                                                        inner join assigntest a on a.testid = t.id
                                                        inner join question q on q.testid=t.id
                                                        inner join marks m on m.questionid=q.id
                                                        where a.userid = ${userId} and t.id=${t.id}`);
        t.question = resultsQ
    }
    return results.length > 0 ? results : null;
};

const clientTestComment = async (assignId, comment) => {
    await new DB().ExecuteQuery(`update assigntest set comments='${comment}', status=3 where id=${assignId}`);
    return;
};

module.exports = {
    getInfoByEmail,
    getClients,
    removeClient,
    addClient,
    getTests,
    addTest,
    editTest,
    removeTest,
    assignTest,
    getActiveTest,
    answerActiveTest,
    clientTests,
    clientTestComment
};
  