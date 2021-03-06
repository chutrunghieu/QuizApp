const question = require("../models/questionModel");
const {questionService, answerService} = require("../services/index");


//Handle Question
exports.createQuestion = async (req, res) => {
  const {content} = req.body;
  try {
    const newQuestion = await questionService.createQuestion(content);
    return res.status(200).json({msg:"Success",newQuestion});
  } catch (error) {
    console.log(error);
  }
};

exports.getQuestions = async (req, res) =>{
  try {
    const getQuestions = await question.findAll();
    return res.status(200).json({msg:"Success",getQuestions});
  } catch (error) {
    console.log(error);
  }
};

exports.getDetailQuestion = async (req, res) => {
  const { id } = req.params.id;
  try {
    const getDetailQuestion = await questionService.findQuestionById(id);
    const getCorrectAnswers = await answerService.getCorrectAnswer(id);
    const getWrongAnswers = await answerService.getWrongAnswer(id);
    return res.status(200).json({msg:"Success",getDetailQuestion,getCorrectAnswers,getWrongAnswers});
  } catch (error) {
    console.log(error);
  }
};
exports.deleteQuestion = async (req, res) =>{
  const {id} = req.body;
  try {
    const findOneQuestion = await questionService.findQuestionById(id);
    const deleteQuestion = await questionService.deleteQuestion(findOneQuestion.question_id);
    const deleteCorrectAnswer = await answerService.deleteCorrectAnswer(findOneQuestion.question_id);
    const deleteWrongAnswer = await answerService.deleteWrongAnswer(findOneQuestion.question_id);

    return res.status(200).json({msg:"Success",deleteQuestion,deleteCorrectAnswer,deleteWrongAnswer});
  } catch (error) {
    console.log(error);
  }
}
exports.updateQuestion = async(req, res) =>{
  const {id} = req.params.id;
  const {content} = req.body;
  try {
    // const findOneQuestion = await questionService.findQuestionById(id);
    const updateQuestion = await questionService.updateQuestion(id, content);
    return res.status(200).json({msg:"Success",updateQuestion});
  } catch (error) {
    console.log(error);
  }
}
//Handle Answer
exports.createCorrectAnswer = async (req, res) => {

  const { content, question_id } = req.body;
  try {
    const findQuestion = await questionService.findQuestionById(question_id);
    const newCA = await answerService.createCorrectAnswer(content, findQuestion.question_id);
    return res.status(200).json({msg:"Success",newCA});
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCorrectAnswer = async (req, res) =>{
  const {id} = req.body;
  try {
    const findCorrectAnswer = await answerService.getCorrectAnswerId(id);
    const deleteCorrectAnswer = await answerService.deleteCorrectAnswer(findCorrectAnswer.correct_answers_id);
    return res.status(200).json({msg:"Success",deleteCorrectAnswer});
  } catch (error) {
    console.log(error);
  }
}
// exports.updateCorrectQuestion = async(req, res) =>{
//   const {content,id} = req.body;
//   try {
//     const findCorrectAnswer = await answerService.getCorrectAnswerId(id);
//     const updateCorrectQuestion = await answerService.updateCorrectQuestion(findCorrectAnswer.correct_answers_id, content);
//     return res.json({updateCorrectQuestion});
//   } catch (error) {
//     console.log(error);
//   }
// }
exports.createWrongAnswer = async (req, res) => {
  const { content, question_id } =  req.body;
  try {
    const findQuestion = await questionService.findQuestionById(question_id);
    const newWA = await answerService.createWrongAnswer(content, findQuestion.question_id);
    return res.status(200).json({msg:"Success",newWA});
  } catch (error) {
    console.log(error);
  }
};
exports.deleteWrongAnswer = async (req, res) =>{
  const {id} = req.body;
  try {
    const findWrongAnswer = await answerService.getWrongAnswerId(id);
    const deleteWrongAnswer = await answerService.deleteWrongAnswer(findWrongAnswer.wrong_answers_id);
    return res.status(200).json({msg:"Success",deleteWrongAnswer});
  } catch (error) {
    console.log(error);
  }
}

// exports.updateWrongQuestion = async(req, res) =>{
//   const {content, id} = req.body;
//   try {
//     const findWrongAnswer = await answerService.getWrongAnswerId(id);
//     const updateWrongQuestion = await answerService.updateWrongQuestion(findWrongAnswer.wrong_answers_id, content);
//     return res.json({updateWrongQuestion});
//   } catch (error) {
//     console.log(error);
//   }
// }
