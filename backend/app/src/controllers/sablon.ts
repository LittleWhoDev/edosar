import { Router } from 'express'
import { rolesGuards } from 'src/auth'
import { UserRole } from 'src/models/interfaces/user'
import { SablonODM } from 'src/models/odms/sablon'
import { checkContract } from 'src/utils/contracts'

export const router = Router()

router.get('/', ...rolesGuards(), async (req, res) => {
  res.json(await SablonODM.find({}).exec())
})

router.get('/:id', ...rolesGuards(), async (req, res) => {
  res.json(await SablonODM.findById(req.params.id).populate('author').exec())
})

router.post('/', ...rolesGuards([/*UserRole.PRIMARIE*/]), async (req, res) => {
  res.json(await SablonODM.create({ ...req.body, author: req.user?.id }))
})

router.put('/:id', ...rolesGuards([/*UserRole.PRIMARIE*/]), async (req, res) => {
  const user = req.user
  const sablon = await SablonODM.findById(req.params.id)
    .populate('author')
    .exec()

  checkContract([
    [sablon !== null, 'Sablon not found'],
    [sablon!.author.id === user?.id, 'Forbidden'],
  ])

  res.json(await sablon!.update(req.body).exec())
})
