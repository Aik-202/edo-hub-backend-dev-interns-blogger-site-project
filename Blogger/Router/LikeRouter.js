const path=require('path');

const {Likes,Like}=require(path.join(__dirname,'..','Model','likeSchema.model'));

const {Post}=require(path.join(__dirname,'..','Model','posts.model'));

const express=require('express');

const likeRouter=express.Router();

likeRouter.post('/likes/post/:username/:slug',(req,res)=>{
    const {username,slug}=req.params;
    Post.findOne({username:username,slug:slug},function(error,result){
        if(error){
            console.log(`get like ${error}`)
        }
        else{
            if(result){
                const newLike=new Like({
                    post:{
                        id:result._id,
                        slug:slug
                    },
                    user:req.session.userIdentification
                    

                })
                newLike.save();
                Likes.findOne({id:result._id,slug:slug},function(errors,outcome){
                    if(errors){
                        console.log(`from Likes ${errors}`)
                    }
                    else{
                        if(!outcome){
                            const newLikesCount=new Likes({
                                post:{
                                    id: result._id,
                                    slug:slug,
                                },
                                totalLike:0,
                            
                            })

                            newLikesCount.save();
                        }
                        else{
                            const newCountValue=outcome.totalLike+1;
                            Likes.update({id:result._id,slug:slug},{$set:{totalLikes:newCountValue}},function(issues){
                                if(issues){
                                    console.log(`likes update produced ${issues}`)

                            }
                        })
                    }
                }
            })
        }
        }
    })
    });



    module.exports={likeRouter
    };