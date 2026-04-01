const express = require('express')
const router = express.Router()
const {getPegawai, createPegawai, getPegawaiById, deletePegawai, updatePegawai} = require('../controller/pegawaiController')

router.route('/').get(getPegawai).post(createPegawai)
router.route('/:id').get(getPegawaiById).delete(deletePegawai).put(updatePegawai)

module.exports = router