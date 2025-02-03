const express = require('express')
const { TrueWalletAungPao } = require('../controller/wallet')
const router = express.Router()

router.post('/topup', TrueWalletAungPao)

module.exports = router