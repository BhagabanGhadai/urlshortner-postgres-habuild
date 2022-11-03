const express=require('express')
const router=express.Router()
const urlController=require('../controllers/urlController')

router.post('/shorten',urlController.shorten)
router.get('/:shortId',urlController.decodeToOriginal)
router.put('/url',urlController.updateUrl)


module.exports=router