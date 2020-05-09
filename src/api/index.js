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
//教师发布题目
export const displayTitle=(data)=>http.put('/teacher/publishPaper',data);



//学生拉取所有老师的试卷信息
export const getStudentPaper=(query)=>http.get('/student/getPaperList',query)
// 学生拉取某一张试卷的信息
export const getPaperInfo = (query) => http.get('/student/getPaperInfo', query)