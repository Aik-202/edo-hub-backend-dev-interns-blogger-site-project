const path=require('path');

const {AuthRoutes}=require(path.join(__dirname,'..','Authentication','AuthRoutes'));

const {createPost,viewAPost,likePost,updateAPost,deletePost,blockASpecificPost,unBlockASpecificPost,searchForAPost,getAllPostOfAUser,reportAPost}=require(path.join(__dirname,'..','Controller','Post.controller'));

const {bookMarkAPost,unBookMarkAPost,getAllbookMarks}=require(path.join(__dirname,'..','Controller','bookmark.controller'));

const {body}=require('express-validator');

const postRouter=require('express').Router();

postRouter.post('/create',[
    body('title').trim().notEmpty().withMessage('the title field cannot be empty'),
    body('content').trim().notEmpty().withMessage('the content field cannot be empty')
],createPost);

postRouter.get('/find',searchForAPost);

postRouter.get('/:id',getAllPostOfAUser);

postRouter.get('/view/:id/:title/:author',viewAPost);

postRouter.post('/like/:id/:title/:author',likePost);

postRouter.patch('/block/:id',blockASpecificPost);

postRouter.patch('/unblock/:id',unBlockASpecificPost);

postRouter.patch('/edit/:id',[
    body('content').trim().notEmpty().withMessage('The content field cannot be empty')
],updateAPost);

postRouter.delete('/delete/:id',deletePost);



postRouter.patch('/report',[
    body('reason').trim().notEmpty().withMessage('The reason field cannot be empty')
],reportAPost)




postRouter.patch('/bookmark/:id',bookMarkAPost);

postRouter.patch('/unbookmark/:id',unBookMarkAPost);

postRouter.get('/boomarks',getAllbookMarks);

module.exports={
    postRouter
}

