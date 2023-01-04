const { validationResult } = require('express-validator');
const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

const {Comment}=require(path.join(__dirname,'..','Model','comment.model'));

async function  commentSystem(req,res){
//where id is the id of the post,originalPost is either true/false denoting that the comment was in reponse to the post directly or to a comment under the post,commentId the id of the comment being commented under.
try{
    const {id,commentId}=req.params;
    
    const {content,originalPost}=req.body;
    const newOriginalPost=(Boolean(originalPost))

    
    
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const foundPost= await Post.findOne({_id:id},{password:0})
        .populate({
            path:'Author',
            select:'-password',
            
            populate:{
                path:'bookMark'
            },
            populate:{
                path:'following'
            },
            populate:{
                path:'followers'
            },
            populate:{
                path:'post'
            }
        })
        .populate({
            path:'Likes',
            populate:{
                path:'bookMark'
            },
            populate:{
                path:'following'
            },
            populate:{
                path:'followers'
            },
            populate:{
                path:'post'
            }
        })

        if(foundPost&& newOriginalPost==true){
         const commentUnderOriginalPost=await Comment.create({
             post:foundPost._id,
             commentor:{
                 commentorInfo:req.session.userId,
                 commentContent:content
             },
     })
   commentUnderOriginalPost.save();
     return res.status(200).json({
         success:true,
         error:[],
         message:"Successfully commented under this post",
         data:{}
     
       })
        }
    else if((foundPost)&&(newOriginalPost==false)){
     const newCommentUnderComment= await new Comment({
             post:foundPost._id,
             commentor:{
                 commentorInfo:req.session.userId,
                 commentContent:content
             },
             commentParent:{
                 originalPost:false,
                 commentedUnder:commentId,
             }
         })
         const commentIdentification=newCommentUnderComment.commentParent.commentedUnder;
        Comment.findOne({_id:commentIdentification,post:id})
        .populate({
            path:'post',
            select:'-password'
        })
        .populate('commentor.commentorInfo')
        .populate('commentParent.commentedUnder')

        .then((foundCommentor)=>{
         foundCommentor.childCommentors.push( newCommentUnderComment.commentor.commentorInfo);
         foundCommentor.save();
         newCommentUnderComment.save()
            return res.status(200).json({
                success:true,
                error:[],
                message:"Successfully commented under this comment",
                data:{}
      
              })
      
     
        })
     
       
     
        }else{
            res.status(404).json({
                success:false,
                error:[],
                message:"Post not found",
                data:{}
            })

        }
     
    }else{
        res.status(422).json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })
    }
}catch(error){
    res.status(500).json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while process your request, please try again",
        data:{}
    })

};



}

async function deleteComment(req,res){
   try{
    const {id,commentId}=req.params;
    Comment.findOneAndDelete({post:id,_id:commentId},{new:true})
    .then(async(deletedComment)=>{
     Comment.deleteMany({post:id,'commentParent.commentedUnder':commentId},{new:true})
     .then(async()=>{
      const foundParent=await Comment.updateMany({post:id,$pull:{childCommentors:commentId}},{new:true});
      res.send(foundParent)
  
     })
    })
  
   }catch(error){
    res.status(500).json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while process your request, please try again",
        data:{}
    })

};

}

async function editComment(req,res){
   try{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const {id,commentId}=req.params;
   
   const {content}=req.body;

   Comment.findOneAndUpdate({post:id,_id:commentId},{$set:{'commentor.commentContent':content}},{new:true})
   .populate({
    path:'post',
    populate:{
        path:'commentor.commentorInfo'
    },
    populated:{
        path:'commentParent.commentedUnder'
    },
    populated:{
        path:'childCommentors'
    }
  
   })
   .then((value)=>{
    res.status(200).json({
        success:true,
        error:[],
        message:"comment Content updated successfully",
        data:value

    })
   })
    }else{

        res.status(422).json({
            success:false,
            error:errors.array(),
            message:"Invalid Input",
            data:{}
        })
    }
   }catch(error){
    res.status(500).json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while process your request, please try again",
        data:{}
    })

}

}

async function getAllDirectComments(req,res){
    try{
        const {id}=req.params;
    Comment.find({post:id,' commentParent.originalPost':true})
    .populate('post')
    .populate('commentor.commentorInfo')
    .then((value)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"Comments fetched successfully",
            data:value
    
        })
    })
    }catch(error){
        res.status(500).json({
            success:false,
            error:[
                {
                    value:error.value,
                    error:error.name,
                    message:error.message
                }
            ],
            message:"An error occurred while process your request, please try again",
            data:{}
        })
    
    }
    
}

async function getCommentsUnderThatComment(req,res){
    try{
        const {id,commentId}=req.params;
    Comment.find({post:id,'   commentParent.originalPost':false,'commentParent.commentedUnder':commentId})
    .populate('commentor.commentorInfo')
    .then((value)=>{
        res.status(200).json({
            success:true,
            error:[],
            message:"Comments fetched successfully",
            data:value
    
        })
    })
    }catch(error){
        res.status(500).json({
            success:false,
            error:[
                {
                    value:error.value,
                    error:error.name,
                    message:error.message
                }
            ],
            message:"An error occurred while process your request, please try again",
            data:{}
        })
    
    }
}



module.exports={
    commentSystem,
    deleteComment,
    editComment,
    getAllDirectComments,
    getCommentsUnderThatComment
}