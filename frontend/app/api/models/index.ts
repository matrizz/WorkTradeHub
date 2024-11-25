import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const User = prisma.user
const Transaction = prisma.transaction
const Service = prisma.service
const Notification = prisma.notification
const Candidate = prisma.candidate

export { User, Transaction, Service, Candidate, Notification }
