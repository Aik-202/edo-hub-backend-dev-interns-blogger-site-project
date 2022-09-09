const path=require('path');

const {Post}=require(path.join(__dirname,'.','Model','posts.model'));

const {register}=require(path.join(__dirname,'.','Model','userDetails.model'))

// title:String,
// slug:String,
// author:String,
// date:String,
// content:String,
// numberOfLikes:Number,
// numberOfCommenta:Number

async function postNewPosts(req,res){
    const {date,title}=req.params;
    try{
        register.findOne({ autoGeneratedUserName:req.sessionNameIdentification},async function(error,result){
            if(error){
                console.log(`user's post :${error}`)
            }
            else{
                if(result){
                    const newPost=new Post({
                        title:title,
                        slug:`/views/posts/${result._id}/${req.session.userNameIdentification}/${title}`,
                        author:req.session.userNameidentification,
                        date:date,
                        content:content,
                        numberOfLikes:0,
                        numberOfComments:0
                    })
                    newPost.save();
                }
            }
        })

    }catch(err){
        console.log(`new post: ${err}`);
    }

}

async function getPosts(req,res){
   try{
    const {username}=req.params;
    Post.find({ autoGeneratedUserName:username},{'_id':0},function(error,outcome){
        if(error){
            console.log(`error finding user's post :${error}`);
        }
        else{
            if(outcome.length!=0){
                res.render('listOfPosts',{outcome})

            }
            else{
                const message="user doesn't have any post"
                res.render('listOfPosts',{message});
            }
        }
    })
   }catch(err){
    console.log(`can't find user's post`)

   }
    

}

module.exports={
    postNewPosts,
    getPosts
}