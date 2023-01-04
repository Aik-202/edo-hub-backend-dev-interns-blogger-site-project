const path=require('path');

const {User}=require(path.join(__dirname,'..','Model','user.model'));

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

async function searchUser(req,res){
    try{
        const {name}=req.query;
    const lowerName=name.toLowerCase();
    User.find({fullName:{$regex:`.*${lowerName}.*`},Admin:false},{password:0})
    .then((foundUsers)=>{
        if(foundUsers){
            res.status(200).json({
                success:false,
                error:[],
                message:"Users fetched successfully",
                data:foundUsers
            })

        }else{
            res.status(404).json({
                success:false,
                error:[],
                message:"User not found",
                data:{}

            })

    }
})

    }
    catch(error){
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

// async function searchPost(req,res){
//     const {title}=req.query;
//     const lowerTitle=title.toLowerCase();
//     Post.find({title:{$regex:`.*${lowerTitle}.*`}},{password:0},function(error,foundPosts){
//         if(error){
//             res.status(500).json({
//                 success:false,
//                 error:[],
//                 message:"An error occurred while processing your request, please try again",
//                 data:{}
//             })
//         }else if(foundPosts){
//             res.status(200).json(foundPosts)

//         }else{
//             res.status(404).json({
//                 success:false,
//                 error:[],
//                 message:"Post not found",
//                 data:{}

//             })
//         }
//     })


// }

module.exports={
    searchUser,
}