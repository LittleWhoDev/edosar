import { Router } from 'express'
import { rolesGuards } from 'src/auth'
import { ActODM } from 'src/models/odms/act'
import { ActePath } from 'src/utils/upload'
import { v4 as uuidv4 } from 'uuid'

export const router = Router()

router.get('/', ...rolesGuards(), async (req, res) => {})
router.get('/:id', ...rolesGuards(), async (req, res) => {})

router.post('/', ...rolesGuards(), async (req, res) => {
  if (req.files === null || req.files!.act === undefined) {
    res.status(400).json('No file uploaded')
    return
  }

  const act = req.files!.act
  const origName = act.name
  const filename = uuidv4()
  const uniqName = `${filename}.${
    origName.split('.')[origName.split('.').length - 1]
  }`

  const newAct = await ActODM.create({
    author: req.user!.id,
    filename: uniqName,
    originalFilename: origName,
  })
  const path = `${ActePath}/${uniqName}`

  act.mv(path, (err) => {
    console.log(err)
    res.json(newAct)
  })
})

router.put('/:id', ...rolesGuards(), async (req, res) => {})
