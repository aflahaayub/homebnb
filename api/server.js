const express = require('express');
const cors = require('cors')

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const download = require('image-downloader');
const multer = require('multer')
const fs = require('fs')

require('dotenv').config()
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/homebnb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log('CONNECTION OPEN!');
  })
  .catch(err =>{
    console.log('ERROR');
    console.log(err);
  });

const User = require('./models/UserSchema');
const Place = require('./models/PlaceSchema')
const Booking = require('./models/BookingSchema')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'SahofoadsoAHS7A676876sADSIudawf'

const getUserToken = (req) =>{
  return new Promise((resolve, reject)=>{
    jwt.verify(req.cookies.token, jwtSecret, {}, async(err, user)=>{
      if(err) throw err;
      resolve(user)
    })
  })
}

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.get('/test', (req,res)=>{
  res.json('test ok')
})

app.post('/register', async (req,res)=>{
  const {name, email, password} = req.body;
  try{
    const user =  new User({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
    })
    await user.save().then().catch(err=> console.error(err))

    res.json(user)
  }catch (e){
    res.status(422).json(e)
  }
})

app.post('/login', async(req,res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if(user){
    const passOk = bcrypt.compareSync(password, user.password)
    if(passOk){
      jwt.sign({
        email: user.email, 
        id: user._id,
        // name: user.name
        }, jwtSecret, {}, (err, token)=>{
        if(err) throw err
        res.cookie('token', token).json(user)

      })
      
    }else{
      res.status(422).json('pass not ok')
    }
    
  }else{
    res.json('not found')
  }
})

app.get('/profile', (req,res)=>{
  const {token} = req.cookies;
  
  if(token){
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
      if(err) throw err;
      const {name,email,_id} = await User.findById(user.id)
      res.json({name,email,_id})
    })
  }else{
    res.json(null)
  }
})

app.post('/logout', (req,res)=>{
  res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async(req,res)=>{
  const {link} = req.body;
  const newName = 'photo-' +Date.now() + '.jpg';
  await download.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  })
  res.json(newName)

})

const photosMiddleware = multer({dest:'uploads/'})

app.post('/upload', photosMiddleware.array('photos', 100), (req,res)=>{
  const uploadedFiles = []
  for(let i = 0; i< req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads', ''))
  }
  res.json(uploadedFiles)
})

app.post('/places', (req,res)=>{
  const {token} = req.cookies;
  const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
  jwt.verify(token, jwtSecret, {}, async(err, user)=>{
    if(err) throw err;
    const photos = addedPhotos
    const placeDoc = await Place.create({
      owner: user.id,
      title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
    })
    res.json(placeDoc)
  })
})

app.get('/user-places', (req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async(err, user)=>{
    if(err) throw err;
    const id = user.id
    res.json(await Place.find({owner: id}))
  })
})

app.get('/places/:id', async(req,res)=>{
  const {id} = req.params
  res.json(await Place.findById(id))
})

app.put('/places', async(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async(err, user)=>{
    if(err) throw err;
    const {
      id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body
    
    jwt.verify(token, jwtSecret, {}, async(err, user)=>{
      if(err) throw err;
      const photos = addedPhotos
      const placeDoc = await Place.findById(id)
      if(user.id === placeDoc.owner.toString()){
        placeDoc.set({
          title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        })
        await placeDoc.save()
        res.json(placeDoc)
      }
    })
    
  })
})

app.get('/places', async(req,res)=>{
  res.json(await Place.find())
})

app.post('/bookings', async(req, res)=>{
  const user = await getUserToken(req)
  const {place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body

  Booking.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price, user: user.id
  }).then((doc)=>{
    res.json(doc)
  }).catch(err=>{
    throw err
  })
})

app.get('/bookings', async(req,res)=>{
  const userData = await getUserToken(req)
  const user = userData.id
  res.json(await Booking.find({user}).populate('place'))
})

app.listen(4000)