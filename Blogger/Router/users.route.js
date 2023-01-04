const path=require('path');

const {searchUser}=require(path.join(__dirname,'..','Controller','makeASearch.controller'));

const {followAuser, unFollowAUser,getFollowers,getListOfFollowing}=require(path.join(__dirname,'..','Controller','following.controller'));

const {blockUser,unBlockUser}=require(path.join(__dirname,'..','Controller','users_block.controller'));

const userRouter=require('express').Router();

//search for users matching query

userRouter.get('/',searchUser);

userRouter.patch('/block/:id',blockUser);

userRouter.patch('/unblock/:id',unBlockUser);

userRouter.patch('/follow/:id',followAuser);

userRouter.get('/followers/:id',getFollowers);

userRouter.get('/following/:id',getListOfFollowing)

userRouter.patch('/unfollow/:id', unFollowAUser);

module.exports={
    userRouter
}