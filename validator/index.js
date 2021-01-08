exports.userSignupValidator = (req,res,next)=>{
    req.check('name','name is required').notEmpty()
    req.check('email','Email must be between 3 to 40')
       .matches(/.+\@.+\..+/)
       .withMessage('Email must contain @')
       .isLength({
           min:4,
           max:40
       });
       req.check('password','password is required').notEmpty()
       req.check('password')
          .isLength({
              min:8
          })
          .withMessage('password must contain at last 8 characters')
          .matches(/\d/)
          .withMessage('password must contain a number')
const errors = req.validationErrors();
if (errors){
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({
        error : firstError
    });
   
}
 next()         
};