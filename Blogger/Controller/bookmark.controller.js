const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));


async function bookMarkAPost(req,res){
    try{
        const {id}=req.params;
        User.updateOne({_id:req.session.id},{$push:{bookMark:id}})



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

async function  unBookMarkAPost(req,res){
try{
    const {id}=req.params;
    User.updateOne({_id:req.session.userId},{$pull:{bookMark:id}})
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

async function getAllbookMarks(req,res){
  try{
    User.findOne({_id:req.session.userId})
    .select('bookMark')
    .populate('bookMark')
    .populate({
        path:'bookMark',
        populate:{
            path:'Author',
            select:'-password'

        },
        populate:{
            path:'Likes',
            select:'username'
        },
        populate:{
            path:'Comments',
            select:'username',
            populate:{
                path:'commentor.commentorInfo'

            }
        },
        populate:{
            path:'Views'
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
    bookMarkAPost,
    unBookMarkAPost,
    getAllbookMarks
}