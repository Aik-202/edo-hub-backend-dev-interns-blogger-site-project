const path=require('path');

const {Post}=require(path.join(__dirname,'..','Model','Post.model'));

const {User}=require(path.join(__dirname,'..','Model','user.model'));

async function schedule(){
      const today=new Date().getTime();
      scheduledPost=await  Post.find({'schedule.isScheduled':true})
    if(scheduledPost.length!=0){
        scheduledPost.forEach(async element => {
            const scheduleDate=element.schedule.date;
            const milliScheduleDate=scheduleDate.getTime();
            if(milliScheduleDate==today||today>milliScheduleDate){
                console.log(element)
              
                await Post.updateOne({_id:element._id},{$set:{'schedule.isScheduled':false,'schedule.date':''}});
            }
          });
        
        }

    }

    async function unSuspendUser(){
          const today=new Date().getTime();
        const suspendedUsers=await  User.find({'suspended.isSuspended':true})
        if( suspendedUsers.length!=0){
            suspendedUsers.forEach(async element => {
                const scheduleDate=element.suspended.suspensionEnds.date;
                const milliScheduleDate=scheduleDate.getTime();
                if(milliScheduleDate==today||today>milliScheduleDate){
                  
                    await User.updateOne({_id:element._id},{$set:{isSuspended:false, suspensionEnds:''}});
                }
              });
            }
    
       
    
        }
    


module.exports={
    schedule,
    unSuspendUser
}