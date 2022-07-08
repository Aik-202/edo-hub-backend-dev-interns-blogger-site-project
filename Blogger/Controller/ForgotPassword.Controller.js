const path=require('path');
const dotenv=require('dotenv');
dotenv.config(path.join(__dirname,'.env'));


function getForgetPassword(req,res){
    res.redirect('/forgotpassword');
    }
function PostForgetPassword(req,res){
    // redirect the user to a page that tells him/her to check their email for a link ('check your email we just sent you a link')
    // res.redirect('/we sent you an email');
    const forgetPasswordUserEmail=req.body.email;
    const createTransporter = async () => {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );
      
        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH
        });
      
        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              reject("Failed to create access token :(");
            }
            resolve(token);
          });
        });
      
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.USER_EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH
          }
        });
      
        return transporter;
      };
      
      const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
      };
      
      sendEmail({
        subject: "Test",
        text: "HI, CHI-CHI,HOW ARE YOU?!",
        to: forgetPasswordUserEmail,
        from: process.env.USER_EMAIL
      });

}
module.exports={
    getForgetPassword,
    PostForgetPassword,
}