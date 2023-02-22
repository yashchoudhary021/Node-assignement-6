let express = require("express")
let mongoose = require("mongoose")
let schema = require("./schema")
let PORT = 8080;
let app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const url = "mongodb://127.0.0.1:27017/yashdb"

mongoose.set('strictQuery', false);
mongoose.connect(url, () => {
    console.log("MongoDb is Connected")
}, (e) => {
    console.log(e.message)
})

app.get("/blog", (req, res) => {
    let page = req.query.page;
    let qurey = req.query.search;
    // console.log(page, qurey)
    run()
    async function run() {
        try {
            const user = await schema.find({ id: page, topic: qurey })
            res.status(200).send(user)
            // console.log(user)
        } catch (e) {
            console.log(e.message)
        }
    }
})
app.post("/blog", (req, res) => {
    run()
    async function run() {
        try {
            let arr = []
            let userId = await schema.find()
            for(let i=0; i<userId.length; i++){
                arr.push(userId[i].id)
            }
            // console.log(arr.sort((a,b) => a-b)) // [1, 2, 3]

            let num = arr[arr.length-1]+1

            const user = await schema.create({
                id: num,
                topic: req.body.topic,
                description: req.body.description,
                posted_at: req.body.posted_at,
                posted_by: req.body.posted_by
            })
            res.status(200).send(user);
        } catch (e) {
            console.log(e.message)
        }
    }
})

app.put("/blog", (req, res) => {
    let id = parseInt(req.params.id);
    // console.log(typeof (id));
    run();
    async function run() {
        try {
            let user = await schema.find({ id: id });
            user.topic = "new_topic";
            user.description = "xyz";
            user.posted_at = "xydksk";
            user.posted_by = "sdhifuk";
            await user.save()
            res.send(user)
        } catch (e) {
            console.log(e.message)
        }
    }
})

app.delete("/blog/:id", (req, res) => {
    const id = req.params.id;
    run()
    async function run(){
        try{
            const data = await schema.deleteOne({id : id})
            console.log(data)
            res.send(data);
        }catch(e){
            console.log(e.message)
        }
    }
})

app.listen(PORT, () => console.log(`Server working on ${PORT}.`))