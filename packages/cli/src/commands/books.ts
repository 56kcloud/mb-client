import {BookPropsSchema} from '@/core/models/book'
import {Option, program} from 'commander'
import {engineAPI} from '..'
import {handleAPIResponse, validateArgs} from '../utils/toolbox'
import {log} from 'console'
import chalk from 'chalk'
import prompts from 'prompts'

const books = program.command('books')

books.command('create')
  .addOption(new Option('-b, --book <book>', 'book object'))
  .action(async (args) => {
    const {isValid} = await validateArgs(() => {
      if (args.book) {
        BookPropsSchema.parse(JSON.parse(args.book))
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.create(args.book)
      log(chalk.bold('📕 - Book created!'))
      return res
    })
  })

books.command('get')
  .addOption(new Option('--bookId <bookId>', 'ID of the book to retrieve'))
  .action(async (args) => {
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.retrieve(args.bookId)
      log(chalk.bold('✅ - Book retrieved!'))
      return res
    })
  })

books.command('update')
  .addOption(new Option('--bookId <bookId>', 'ID of the book to update'))
  .addOption(new Option('--book <book>', 'book object'))
  .action(async (args) => {
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
      if (args.book) {
        BookPropsSchema.parse(JSON.parse(args.book))
      } else {
        const response = await prompts({
          type: 'text',
          name: 'book',
          message: 'Enter the Book object:',
          validate: value => BookPropsSchema.safeParse(JSON.parse(value)).success 
            ? true 
            : 'Please enter a valid Book object'
        })
        args.book = response.book
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.update(args.bookId, args.book)
      log(chalk.yellow.bold('📕 - Book updated!'))
      return res
    })
  })

books.command('cancel')
  .addOption(new Option('--bookId <bookId>', 'id of the book to cancel'))
  .action(async (args) => {
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.cancel(args.bookId)
      log(chalk.yellow.bold('📕 - Book canceled!'))
      return res
    })
  })

books.command('delete')
  .addOption(new Option('--bookId <bookId>', 'id of the book to delete'))
  .action(async (args) => {
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.delete(args.bookId)
      log(chalk.red.bold('🗑️ - Book deleted!'))
      return res
    })
  })

books.command('galleon')
  .addOption(new Option('--bookId <bookId>', 'id of the book to retrieve galleon'))
  .action(async (args) => {
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.books.retrieveGalleon(args.bookId)
      log(chalk.red.bold('✅ - Galleon retrieved!'))
      return res
    })
  })
