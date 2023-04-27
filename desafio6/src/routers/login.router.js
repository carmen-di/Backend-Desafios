import { Router } from "express";
import usersModel from "../dao/mongo/models/user.schema.js";

export const loginRouter = Router();

loginRouter.get('/', (req, res) => {
    res.render('login', {});
})

loginRouter.get('/user', async (req, res) => {
    const {email, password} = req.query
    try {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
            req.session.user = email
            req.session.admin = true
            return res.status(200).send({message:'success'})
        }else{
            const result = await usersModel.findOne({email: email, password: password})
            console.log('result', result)
            if (result){
                req.session.user = email
                req.session.admin = false
                req.session.rol = 'usuario'
                console.log('admin ',req.session.admin)
                return res.status(200).send({message:'success'})
            }else{
                res.status(401).send({message:'error'})
            }   
        }
    } catch (error) {
        res.status(500).send({error: error});
    }
    
});

const auth = async (req, res, next) => {
    console.log('auth', req.session.user)
    if (await req.session?.user){
        return next()
    }else{
        return res.status(401).send('error de autenticación')
    }
}


loginRouter.get('/products', auth, async (req,res)=>{
    if (await req.session?.user){
        if (req.session?.admin){
            const userData = await usersModel.findOne({ email: req.session.user})
            return res.render('products',{ admin: 'Administrador'}) 
        }
        const userData = await usersModel.findOne({ email: req.session.user})
        const {firstName, lastName} = userData
        res.render('products',{firstName, lastName}) 
    }
})


loginRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error){
            res.status(401).send({message:'ERROR'})
        }else{
            res.status(200).send({message:'LogoutOK'})
        }
    })
})