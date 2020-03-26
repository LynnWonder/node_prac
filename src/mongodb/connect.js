var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.info("数据库已连接!");
    let dBase = db.db("test");
    // dBase.createCollection('site', function (err, res) {
    //     if (err) throw err;
    //     console.log("创建集合!");
    //     db.close();
    // });
    // let myobj = { name: "菜鸟教程", url: "www.runoob" };
    // dBase.collection("site").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("文档插入成功");
    //     db.close();
    // });
    // 查询所有数据
    // dBase.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    //     console.info(Array.isArray(result));
    //     let data=result[0];
    //     console.info('data===>',data,data.name);
    //     db.close();
    // });
    dBase.collection("site"). findOne({_id:'5e7c966208b780a3433b8178'}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        console.info(Array.isArray(result));
        let data=result[0];
        console.info('data===>',data,data.name);
        db.close();
    });
});