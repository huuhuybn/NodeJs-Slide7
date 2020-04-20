let express = require('express');

let hbs = require('express-handlebars');
let multer = require('multer');

let app = express();

app.engine('.hbs', hbs({
    extname: 'hbs',
    defaultLayout: '',
    layoutsDir: '',
}))

let mongoose = require('mongoose');
let userSchema = require('./model/userSchema');
let User = mongoose.model('users', userSchema);
app.set('view engine', '.hbs')


mongoose.connect('mongodb+srv://huuhuybn:Emmaila123@cluster0-rwlpt.mongodb.net/demo1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r => {
    console.log('Connected');
});


let storage = multer.diskStorage({

    destination: function (req, res, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname);
    }
});

let upload = multer(
    {
        storage: storage, limits: {
            fileSize: 2 * 1024 * 1024
        }
    });

app.listen(8989);

app.get('/', (req, res) => {
    res.render('index')
});
app.get('/add', async (req, res) => {
    const user = new User({
        username: 'abc',
        full_name: 'Nguyen Phuoc Sang',
        role: 'admin', birthday: '04/03/1992'
    });

    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res.send(e);
    }

});
app.get('/update', async (req, res) => {
    try {

        await User.findByIdAndUpdate('5e9d09feb69cd214a44d1792', {
            full_name: 'HHHHHHHHHHHHHHHHH'
        });
        res.send('Update Thanh cong!!!!');
    } catch (e) {
        res.send('Co loi xay ra : ' + e.message);
        ;
    }
});
app.get('/remove', async (req, res) => {

    try {
        const stt = await User.findByIdAndDelete('5e9d09feb69cd214a44d1792')
        if (!stt) {
            res.send('Khong ton tai');
        } else {
            res.send('Xoa thanh cong.!!!');
        }
    } catch (e) {

    }
});

app.get('/findAll', async (req, res) => {
    let users = await User.find({});
    try {
        res.send(users);
        console.log(users)
    } catch (e) {
        res.send('Khong co User Nao');
    }
});


let up = upload.single('avatar');
app.post('/upload', function (req, res) {
    up(req, res, function (error) {
        if (error)
            if (error instanceof multer.MulterError) {
                return res.send('Upload File khong thanh cong');
            } else {
                return res.send(error.message);
            }

        res.send('Thanh cong')
    });
});


app.post('/add', function (req, res) {
    let name = 'HuyNguyen';
    res.render('index', {data: name})

});

app.post('/edit', function (req, res) {
    let name = 'HuyNguyen';
    res.render('index', {data: name})

});



