const { validationResult } = require('express-validator');
const path =require('path');

const {Comment}=require(path.join(__dirname,'..','Model','comment.model'));

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

async function createPost(req,res){
   try{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        const {title,content}=req.body;
        if(req.body.schedule){
            const newPost= await new Post({
                title:title,
                Author:'63aa4db16b4fb8abff2f1ea5',
                content,
                'Private.isPrivate':req.body.private?req.body.private:false,
                schedule:{
                    isScheduled:true,
                    date:req.body.date
                }
                
    
            })
            newPost.slug=`/posts/${newPost._id}/${newPost.title}/${newPost.Author}`;
            newPost.save();
            res.status(201).json({
                success:true,
                error:[],
                message:"Post created successfully",
                data:{}
    
            })
    
        }else{
            const newPost= await new Post({
                title:title,
                content,
                Author:'63aa4db16b4fb8abff2f1ea5',
                'Private.isPrivate':req.body.private?req.body.private:false,      
            })
            newPost.slug=`/posts/${newPost._id}/${newPost.title}/${newPost.Author}`;
            newPost.save();
            res.status(201).json({
                success:true,
                error:[],
                message:"Post created successfully",
                data:{}
    
            })
    
    
    
        }
    

    }else{
        res.status(422)
        .json({
            success:false,
            error:errors.array(),
            message:"Invalid input",
            data:{}
        })
    }

   }catch(error){
    res.status(400)
     .json({
         success:false,
         error:[
             {
                 value:error.value,
                 error:error.name,
                 message:error.message
             }
         ],
         message:"An error occurred while processing your request",
         data:{}
     })

   }
}

async function viewAPost(req,res){
    try{
        const {id,title,author}=req.params;
    Post.findOne({_id:id,title:title,Author:author},{password:0},async function(error,viewedPost){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again",
                data:{}
            })
        }else if(viewedPost){
            console.log(viewedPost.Author)
           if(viewedPost.Author!=req.session.userId){
            await Post.updateOne({_id:id,title:title,Author:author,Admin:false},{$addToSet:{Views:req.session.userId}})
           .then((updatedPost)=>{
            res.status(200).json({
                success:true,
                error:[],
                message:"You have successfully viewed this post",
                data:viewedPost
            })
           })
           }else{
            res.status(200).json(
                {   success:true,
                    error:[],
                    message:"You have viewed your post",
                    data:viewedPost
                   })
           }
       
           
        }

    })

    }catch(error){
        res.status(400)
         .json({
             success:false,
             error:[
                 {
                     value:error.value,
                     error:error.name,
                     message:error.message
                 }
             ],
             message:"An error occurred while processing your request",
             data:{}
         })
    
       }

}

async function  likePost(req,res){
    try{
        const {id,title,author}=req.params;
    Post.findOne({_id:id,title:title,Author:author},{password:0},async function(error,likedPost){
        if(error){
            res.status(500).json({
                success:false,
                error:[],
                message:"An error occurred while processing your request, please try again",
                data:{}
            })
        }else if(likedPost){
            console.log(likedPost.Author)
           if(likedPost.Author!=req.session.userId){
            await Post.updateOne({_id:id,title:title,Author:author,Admin:false},{$addToSet:{Likes:req.session.userId}})
           .then((addedLikePost)=>{
            res.status(200).json({
                success:true,
                error:[],
                message:"You have successfully liked this post",
                data:{}
            })
           })
           }else{
            res.status(200).json(
                {   success:true,
                    error:[],
                    message:"You cannot like your own post",
                    data:{}
                   })
           }
       
           
        }

    })

    }catch(error){
        res.status(400)
         .json({
             success:false,
             error:[
                 {
                     value:error.value,
                     error:error.name,
                     message:error.message
                 }
             ],
             message:"An error occurred while processing your request",
             data:{}
         })
    
       }





}


async function updateAPost(req,res){
    try{
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const {id}=req.params;
    const {content}=req.body;
    Post.findOneAndUpdate({_id:id},{$set:{content:content}})
    .then((value)=>{
        res.status(200).json(
            {   success:true,
                error:[],
                message:"Post successfully updated",
                data:value
               })

    })
        }else{
            res.status(422)
            .json({
                success:false,
                error:errors.array(),
                message:"Invalid inputs",
                data:{}
            })
        }
    }catch(error){
        res.status(400)
         .json({
             success:false,
             error:[
                 {
                     value:error.value,
                     error:error.name,
                     message:error.message
                 }
             ],
             message:"An error occurred while processing your request",
             data:{}
         })
    
       }




}

async function reportAPost(req,res){
    try{
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const {id}=req.params;
    const {reason}=req.body;
    Post.updateOne({_id:id},{$set:{'reported.reportedStatus':true,reason:reason}})
        }else{
            res.status(422)
            .json({
                success:false,
                error:errors.array(),
                message:"Invalid inputs",
                data:{}
            })

        }
    }catch(error){
        res.status(400)
         .json({
             success:false,
             error:[
                 {
                     value:error.value,
                     error:error.name,
                     message:error.message
                 }
             ],
             message:"An error occurred while processing your request",
             data:{}
         })
    
       }


}

async function deletePost(req,res){
   try{
    const {id}=req.params;
    Post.deleteOne({_id:id})
    .then((deleteComments)=>{
        Comment.deleteMany({post:id})
    })
   }catch(error){
    res.status(400)
     .json({
         success:false,
         error:[
             {
                 value:error.value,
                 error:error.name,
                 message:error.message
             }
         ],
         message:"An error occurred while processing your request",
         data:{}
     })

   }
}

async function blockASpecificPost(req,res){
    try{
        const {id}=req.params;
    Post.updateOne({_id:id},{$push:{blockedPost:'63aa58bfe800002b6fedc9db'}})
    .then((value)=>{
        res.status(200).json(
            {   success:true,
                error:[],
                message:"You successfully blocked this post",
                data:value
               })

    })
    }catch(error){
        res.status(400)
        .json({
            success:false,
            error:[
                {
                    value:error.value,
                    error:error.name,
                    message:error.message
                }
            ],
            message:"An error occurred while processing your request",
            data:{}
        })
    }

}

async function unBlockASpecificPost(req,res){
    try{
        const {id}=req.params;
    Post.updateOne({_id:id},{$pull:{blockedPost:'63aa58bfe800002b6fedc9db'}})
    .then((value)=>{
        res.status(200).json(
            {   success:true,
                error:[],
                message:"You have successfully unblocked this post",
                data:value
               })

    })
    }catch(error){
        res.status(400)
        .json({
            success:false,
            error:[
                {
                    value:error.value,
                    error:error.name,
                    message:error.message
                }
            ],
            message:"An error occurred while processing your request",
            data:{}
        })
    }
}

async function searchForAPost(req,res){
   try{
    const {title}=req.query;
    const lowerTitle=title.toLowerCase();
    Post.find({title:{$regex:`.*${lowerTitle}.*`}},{password:0}).populate('Author')

        
        .then((foundPosts)=>{
            if(foundPosts.length!=0){
                const arrayOfPost=foundPosts.filter((post)=>{
                   if(!(post.blockedPost.includes('63aa58bfe800002b6fedc9db'))){
                       return true
                   }
       
                   })
                   const arrayOfFoundPost=[];
                   arrayOfPost.forEach(singlePost => {
                       if((!singlePost.Author.blockedUsers.includes('63aa58bfe800002b6fedc9db'))&&((singlePost.Private.isPrivate==true && singlePost.Author.followers.includes('63aa58bfe800002b6fedc9db')||(singlePost.Private.isPrivate==false)))){
                           arrayOfFoundPost.push(singlePost)
       
                       }
                       
                   })
                   res.send(arrayOfFoundPost)
       
               }else{
                   res.status(404).json({
                       success:false,
                       error:[],
                       message:"Post not found",
                       data:{}
       
                   })
               }
       
        })


   }catch(error){
    res.status(400)
    .json({
        success:false,
        error:[
            {
                value:error.value,
                error:error.name,
                message:error.message
            }
        ],
        message:"An error occurred while processing your request",
        data:{}
    })
}
}


async function getAllPostOfAUser(req,res){
    try{
    
        Post.find({Author:id}).populate('Author')
 
         
         .then((foundPosts)=>{
             if(foundPosts.length!=0){
                 const arrayOfPost=foundPosts.filter((post)=>{
                    if(!(post.blockedPost.includes(req.session.userId))){
                        return true
                    }
        
                    })
                    const arrayOfFoundPost=[];
                    arrayOfPost.forEach(singlePost => {
                        if((!singlePost.Author.blockedUsers.includes(req.session.userId))&&((singlePost.Private.isPrivate==true && singlePost.Author.followers.includes(req.session.userId)||(singlePost.Private.isPrivate==false)))){
                            arrayOfFoundPost.push(singlePost)
        
                        }
                        
                    })
                    res.send(arrayOfFoundPost)
        
                }else{
                    res.status(404).json({
                        success:false,
                        error:[],
                        message:"Post not found",
                        data:{}
        
                    })
                }
        
         })
 
 
    }catch(error){
     res.status(400)
     .json({
         success:false,
         error:[
             {
                 value:error.value,
                 error:error.name,
                 message:error.message
             }
         ],
         message:"An error occurred while processing your request",
         data:{}
     })
 }
 }



module.exports={
    createPost,
    viewAPost,
    likePost,
    reportAPost,
    updateAPost,
    deletePost,
    blockASpecificPost,
    unBlockASpecificPost,
    searchForAPost,
    getAllPostOfAUser
}

