"use strict";
const express = require('express'); // 引入express模块
const app = express(); // 调用方法生成应用


app.all('*', function (req, res, next) {
    // console.log("xxxxxxxxxx");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());   //使用json数据

const USERS = [
    { id: '01', userName: 'zime123', password: '123456' },
    { id: '02', userName: 'aaa', password: '456789' }
];
var Student = [
    { id: '01', userName: '张三', sex: '男' },
    { id: '02', userName: '李四', sex: '女' }
];
var Product = [
    { id: '1', pName: '管道', num: '1000' },
    { id: '2', pName: '方块', num: '2000' }
]
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});
app.get('/products', function (req, resp) {
    resp.send(Product);
    resp.end();
});
app.get('/products/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let product of Product) {
        if (product.id === id) {
            resp.send([product]);
            break;
        }
    }
    resp.end();
});
app.post('/product', function (req, resp) {

    Product.push(req.body);
    resp.send({ succ: true });
    resp.end();
});
app.delete('/product/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let product of Product) {
        if (product.id === req.params.id) {
            Product.splice(index, 1);
            // student.id = null;
            // student.userName = null;
            // student.sex = null;
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});

app.put('/product', function (req, resp) {
    let founded = false;
    for (let product of Product) {

        if (product.id === req.body.id) {
            product.pName = req.body.pName;
            product.num = req.body.num;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户或性别错误!' });
    }
    resp.end();
});

<<<<<<< HEAD
app.post('/pid', function (req, resp) {
    var pid = [];
    var pnum = [];
    for (let product of Product) {
        pid.push(product.pName);
        pnum.push(parseInt(product.num));
    }
    resp.send({ succ: pid, s: pnum });
    resp.end();
});

=======
>>>>>>> abbffa6eb8e81a075655957e6de31466fd688061
/*初始化用户*/
app.get('/students', function (req, resp) {
    resp.send(Student);
    resp.end();
});
app.put('/people', function (req, resp) {
    var id = 0;
    var id2 = 0;
    for (let student of Student) {
        if (student.sex == "男") {
            id++;
        } else if (student.sex == "女") {
            id2++;
        }
    }
    resp.send({ succ: id, ss: id2 });
    resp.end();
})
/*查找用户*/
app.get('/students/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let student of Student) {
        if (student.id === id) {
            resp.send([student]);
            break;
        }
    }
    resp.end();
});
/*增加用户*/
app.post('/student', function (req, resp) {
    let founded = false;
    console.log(req.params);
    console.log(req.body);
    if (req.body.sex == "男" || req.body.sex == "女") {
        founded = true;
    }
    if (founded) {
        Student.push(req.body);
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '性别应为男或女' });
    }
    resp.end();
});
/*删除用户*/
app.delete('/student/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let student of Student) {
        if (student.id === req.params.id) {
            Student.splice(index, 1);
            // student.id = null;
            // student.userName = null;
            // student.sex = null;
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户!' });
    }
    resp.end();
});
/*更新用户*/
app.put('/student', function (req, resp) {
    let founded = false;
    for (let student of Student) {

        if (student.id === req.body.id) {
            student.userName = req.body.userName;
            student.sex = req.body.sex;
            if (req.body.sex == "男" || req.body.sex == "女") {

                founded = true;
                break;
            }

            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户或性别错误!' });
    }
    resp.end();
});

app.put('/user', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        // if (user.id === req.body.id) {
        //     user.userName = req.body.userName;
        //     user.password = req.body.password;
        //     founded = true;
        //     break;
        // }
        if (user.userName === req.body.userName && user.password === req.body.password) {
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到该用户' });
    }
    resp.end();
});
app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});