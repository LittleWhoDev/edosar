import { Router } from 'express'
import { rolesGuards } from 'src/auth'
import { UserRole } from 'src/models/interfaces/user'
import { DosarODM } from 'src/models/odms/dosar'
import { checkContract, Implication } from 'src/utils/contracts'

export const router = Router()

router.get('/', ...rolesGuards(), async (req, res) => {
  res.json(await DosarODM.find({}).exec())
})

router.get('/:id', ...rolesGuards(), async (req, res) => {
  res.json(
    await DosarODM.findById(req.params.id)
      .populate('from')
      .populate('to')
      .populate('sablon')
      .exec()
  )
})

router.post('/', ...rolesGuards([UserRole.CETATEAN]), async (req, res) => {
  res.json(
    await DosarODM.create({
      ...req.body,
      from: req.user?.id,
      to: req.user?.primarie,
    })
  )
})

router.put(
  '/:id',
  ...rolesGuards([UserRole.CETATEAN, UserRole.PRIMARIE]),
  async (req, res) => {
    const user = req.user
    const dosar = await DosarODM.findById(req.params.id)
      .populate('from')
      .populate('to')
      .exec()

    checkContract([
      [dosar !== null, 'Dosar not found'],
      [
        new Implication(
          user?.role === UserRole.CETATEAN,
          dosar!.from.id === user?.id
        ),
        'You are not the author',
      ],
      [
        new Implication(
          user?.role === UserRole.PRIMARIE,
          dosar!.to.id === user?.id
        ),
        'You are not the receiver',
      ],
    ])

    res.json(await dosar!.update(req.body).exec())
  }
)
