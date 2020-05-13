import http from './http';

//注册请求
export const getRegister=(params)=>http.post('/register',params);
//登录请求
export const getLogin=(params)=>http.post('/login',params);
//获取指定老师题目信息(token里面自己解析ID)
export const getAllPaperList=()=>http.get('/teacher/queryMyPaperList');
//教师创建题目信息
export const createTeacherPaper=(data)=>http.post('/teacher/createPaper',data);
//教师删除试卷
export const deleteTeacherPaper=(paperId)=>http.delete("/teacher/deletePaper",{paperId})


//拉取项目相关的所有信息
export const getTitleAll=(paperId)=>http.get("/teacher/checkInformation",{paperId});
//教师删除指定titleId题目
export const deleteTitle=(titleId)=>http.delete('/teacher/deleteTitle',{titleId});
//教师创建一个题目
export const createTitle=(data)=>http.post('/teacher/createTitle',data);
//教师修改指定titleId题目
export const updateTitle=(titleId)=>http.post('/teacher/changeTitleInfo',titleId);
//教师发布试卷
export const displayTitle=(data)=>http.put('/teacher/publishPaper',data);
// 教师查询是否可以撤销发布试卷
export const getQueryPaperHaveCompalte = (query) => http.get('/teacher/queryPaperHaveCompalte', query);
// 教师查询是否可以发布试卷
export const getQueryPaperCanPublic = (query) => http.get('/teacher/queryPaperCanPublic', query);
// 教师测试答案是否可以正常运行
export const getTestAnswer = (data) => http.post('/teacher/testAnswer', data);


//学生拉取所有老师的试卷信息
export const getStudentPaper=(query)=>http.get('/student/getPaperList',query)
// 学生拉取某一张试卷的信息
export const getPaperInfo = (query) => http.get('/student/getPaperInfo', query)
// 学生获取所有的题目ID信息
export const getAllTitleID = (query) => http.get('/student/getAllTitleID', query);
// 学生获取某一道题的信息
export const getTitleDetailInfo = (query) => http.get('/student/getTitleInfo', query);
// 学生提交一道题
export const completeTitle = (data) => http.post('/student/completeTitle', data);
// 学生查询某一道题是否已经完成
export const getTitleStatus = (query) => http.get('/student/getTitleStatus', query);
// 检测学生是否可以交卷
export const completePaper = (data) => http.post('/student/completePaper', data);
// 学生提交试卷
export const submitPaper = (data) => http.post('/student/submitPaper', data);
// 查询学生是否完成了某一张试卷
export const getPaperBeenCompleted = (query) => http.get('/student/paperBeenCompleted', query);
// 学生提交结果差异对比
export const getResultContrast = (data) => http.post('/student/resultContrast', data);
// 学生获取历史记录
export const getAllComplatePaper = (query) => http.get('/student/getAllComplatePaper', query);