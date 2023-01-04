const path=require('path');

const {body}=require('express-validator');

const {commentSystem,deleteComment,editComment,getAllDirectComments,getCommentsUnderThatComment}=require(path.join(__dirname,'..','Controller','comment.controller'));

const commentRouter=require('express').Router();

commentRouter.post('/create/:id/:commentId',[
    body('content').trim().notEmpty().withMessage('the content field cannot be empty, comment not created')
],commentSystem);

commentRouter.delete('/delete/:id/:commentId',deleteComment);


commentRouter.patch('/edit/:id/:commentId',[
    body('content').trim().notEmpty().withMessage('The content field cannot be empty')
],editComment);

commentRouter.get('/:id',getAllDirectComments);

commentRouter.get('/:id/:commentId',getCommentsUnderThatComment);

module.exports={
    commentRouter
}