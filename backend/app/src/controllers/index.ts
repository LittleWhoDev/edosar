import { Router } from 'express'
import { router as authRouter } from './auth'
import { router as usersRouter } from './users'
import { router as dosarRouter } from './dosar'
import { router as actRouter } from './act'
import { router as sablonRouter } from './sablon'

// Init router and path
const router = Router()
router.use('/', authRouter)
router.use('/users', usersRouter)
router.use('/dosar', dosarRouter)
router.use('/act', actRouter)
router.use('/sablon', sablonRouter)

// Export the base-router
export default router
