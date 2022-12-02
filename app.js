const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/WikiDB")

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


const articleSchema = mongoose.Schema({
  title: String,
  content: String
})

const Articles = mongoose.model("articles", articleSchema)

artdoc = new Articles({
  title: "goddness",
  content: "hello~ there"
})

// artdoc.save()

app.route('/article')
  .get((req, res) => {
    Articles.find((err, arr) => {
      // console.log(arr)
    })
    res.send("hello")
  })
  .post((req, res) => {
    title = req.body.title
    content = req.body.content

    console.log(title, content)
  })
  .put((req, res) => {
    res.send('Update the book')
  })
  .delete((req, res) => {
    res.send(`Delete record with id`);
    console.log("yeah! postman worked")
  })






app.route('/article/:articleTitle')

  .get((req, res) => {
    articleTitle = req.params.articleTitle
    Articles.findOne({ title: articleTitle }, (err, arr) => {
      console.log(arr)
    })
    res.send("hello")
  })
  .put((req, res) => {
    articleTitle = req.params.articleTitle

    Articles.updateOne(
      {title:articleTitle},
      {title:req.body.title , content:req.body.content},
      function (err,arr) {
        if(err){
          console.log(err)
        }else{
          console.log(arr)
        }
      }
      )
    res.send('put the book')
  })

  .patch((req, res) => {


    Articles.updateOne(
      {title:req.params.articleTitle},
      {$set:{content:req.body.content}},
      (err,arr)=>{
        if(err){
          console.log(err)
        }else{
          console.log(arr)
        }
      }
      )

      //here, you can also specify just req.body insidea $set{} which means it will only set those fields that are specified(Entered) by user. this can be dynamic setting. sytax is like $set:{req.body}
    res.send('patch the book')
  })

  .delete((req, res) => {

    Articles.deleteOne({ title: req.params.articleTitle }, (err, arr) => {
      if(err){
        console.log(err)
      }else[
        console.log(arr)
      ]
    })

    res.send("deleted document")
  })


app.listen(3000, function () {
  console.log("Server started on port 3000");
});

