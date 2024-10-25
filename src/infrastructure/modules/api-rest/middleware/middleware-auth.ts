import express from "express";

const middlewareAuth = express();

middlewareAuth.use((req, res, next) => {

  console.log(req.headers);
  
  next()
  
});

export default middlewareAuth;
