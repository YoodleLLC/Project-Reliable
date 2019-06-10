
module.exports=function authenticate(req,res,next){
        try {
                req.session.user={
                        id:"6a5e1cb34bccea2cac8dce2b",
                        username:"arun@yoodle.com",
                        name:"Arun Rattan",
                        orgID:"5a5e6d00a2960331003dafa6",
                        orgType:1
                }
                if(req.session.user){
                console.log('Time: ', Date.now());
                next();
            }
            else{
            res.send(`<html>
                            <h1>Not Authenticated</h1>
                    </html>`)
            }
        } catch (error) {
              console.log(error)  
        }
     
}


