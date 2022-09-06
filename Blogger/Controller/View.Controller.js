const path=require('path');

const {View,viewCount}=require(path.join(__dirname,'.','Model','view.model'));

const {Post}=require(path.join(__dirname,'.','Model','posts.model.js'));

async function postView(req,res){
   try{
    const{slug,username}=req.params;
    Post.findOne({slug:slug},{username},async function(error,result){
        async function postingView(){
            if(error){
                console.log(`views : ${error}`)
            }
            else{
                if(result){
                    View.findOne({slug:slug,id:result._id},function(errors,results){
                        if(errors){
                            console.log(`viewed by col produced : ${errors}`)
                        }
                        else{
                            if(!results){
                               const newView=new View({
                                 post:{
                                    id: result._id,
                                    slug:slug
                                },
                                viewedBy:req.session.userNameIdentification
                                });
                                newView.save();
                                
                                viewCount.findOne({slug:slug,id:result._id},function(issue,output){
                                    if(issue){
                                        console.log(`view count produced: ${issue}`);
                                    }
                                    else{
                                        if(!output){
                                            const countVariable=new viewCount({
                                                post:{
                                                    id: result._id,
                                                    slug:slug
                                                },
                                                count:0
                                            })
        
                                            countVariable.save();
                                        }
                                        else{
                                            const incrementView=output.count + 1;
                                            viewCount.update({slug:slug,id:result._id},{$set:{count:incrementView}},function(problem){
                                                if(problem){
                                                    console.log(`view increment failed : ${problem}`)
                                                }
                                            });
                                        }
                                    }
                                })
                            
                            }
                            else if(results){
                                View.findOne({slug:slug,id:result._id,viewedBy:req.session.userNameIdentification},function(issues,outcome){
                                    if(issues){
                                        console.log(`viewed by produced : ${issues}`)
                                    }
                                    else{
                                        if(!outcome){
                                            const createViewedBy=new View({
                                                post:{
                                                    id:result._id,
                                                    slug:slug
                                                },
                                                viewedBy:req.session.userNameIdentification
        
                                            })
                                            createViewedBy.save();
                                        viewCount.findOneAndUpdate({slug:slug,id:result._id},{count:count+1})
        
                                        }
                                    }
                                })
                            }
                        }
        
        
                    })
        
                }
            }
        
         
        }

        await postingView();
        viewCount.findOne({slug:slug,id:result._id},function(err,product){
            if(err){
                console.log(`find viewCount :${err}`);
            }
            else{
                if(product){
                    res.json({
                        viewcount:product.count
                    }).status(201);
                }
            }
            })
            res.redirect('views/posts/:id/:username/:title');
            // use the above link for the view button/link

       })
   

}


   catch(err){
    console.log(`view ${err}`);
   }
}

//link this to the slug on the frontend and when a user clicks on specific post
async function viewPost(req,res){
    const {id,username,title}=req.params;
    Post.findOne({slug:`/views/posts/${id}/${username}/${title}`},{'_id':0},function(unExpected,finalOutcome){
        if(unExpected){
            console.log(`view selected post:${unExpected}`)
        }
        else{
            if(finalOutcome){
                res.render('postPage',{finalOutcome});
            }
        }
    })


}



module.exports={
    postView,
    viewPost
}