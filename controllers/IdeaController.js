const validator = require('validator');
 const IdeaModel = require('../models/IdeaModel.js');

 /**
 * GET /Ideas
 * List all IDEAS.
 */
 exports.getIdeaList = (req, res) => {
  console.log("get idea list");
  IdeaModel.find((err, result) => {
    console.log(result);
    res.render('home', { MyList: result });
   });
 };

  /**
 * POST /Ideas
 *POST IDEAS.
 */
 exports.PostIdea = (req,res) => {
  console.log('request with paramenters'+req.body);
  const body = req.body;
  const validationErrors = [];
  // mandatory is only message 
  if (validator.isEmpty(req.body.message)) validationErrors.push({ msg: 'Please enter your message.' });

  var model = new IdeaModel();
  model.comment =  req.body.message;
  
  //Getting optional fields
  //getting ip
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null ;
  console.log(req.headers['x-forwarded-for']);
  console.log(req.socket.remoteAddress);
  console.log(ip);

  model.ipAddress = ip;

  
  // getting name
  model.profile.name = validator.isEmpty(req.body.name) ? "UnKnown" : req.body.name;

 // getting email - if user entered then verify otherwise leave it
  
  if(validator.isEmpty(req.body.email)){
      model.profile.email = "abc@abc.com"
  }
  else{
    if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: 'Please enter a valid email address.' });
    }
    else{
      model.profile.email = req.body.email;
    }
  }

  // getting gender 
    model.profile.gender = req.body.gender;

  // getting location
  model.profile.location = validator.isEmpty(body.location) ? "Unknown" : body.location;

  
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/');
  }

  function mFunction() {
    console.log("comming baby");
    return new Promise(function(resolve,reject) {
      const result = IdeaModel.create(model);
      console.log(result);
      resolve(result);
    });
  }

mFunction().then(function(resultt) {
    console.log(resultt);
    // res.json({'success':'true','result':resultt,'requestData':req.body});
    res.redirect('/');
    // res.render('idea', { MedicodeList: docs });
});
}