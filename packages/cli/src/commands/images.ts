import {Option, program} from 'commander'
import {actionSetup, handleAPIResponse, validateArgs} from '../utils/toolbox'
import {formatReturnJSON} from '@/core/utils/toolbox'
import {imageServerSchema} from '@/core/models/design-request/image'
import {log} from 'console'
import chalk from 'chalk'
import prompts from 'prompts'

export const images = program.command('images')

images.command('list')
  .addOption(new Option('--book-id <bookId>'))
  .action(async (args) => {
    const {engineAPI} = await actionSetup()
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
      const res = await engineAPI.images.list(args.bookId)
      return formatReturnJSON(res)
    })
  })

images.command('create')
  .addOption(new Option('--book-id <bookId>'))
  .addOption(new Option('--image <image>', 'image object'))
  .action(async (args) => {
    const {engineAPI} = await actionSetup()
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
      if (args.image) {
        imageServerSchema.parse(JSON.parse(args.image))
      } else {
        const response = await prompts({
          type: 'text',
          name: 'image',
          message: 'Enter the image object:',
          validate: value => imageServerSchema.safeParse(JSON.parse(value)).success 
            ? true 
            : 'Please enter a valid Image object'
        })
        args.image = response.image
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.images.addToBook(args.bookId, args.image)
      log(chalk.bold(`🎆 - Image added to book ${args.bookId}!`))
      return formatReturnJSON(res)
    })
  })

images.command('get')
  .addOption(new Option('--book-id <bookId>'))
  .addOption(new Option('--image-id <imageId>'))
  .action(async (args) => {
    const {engineAPI} = await actionSetup()
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
      if (!args.imageId) {
        const response = await prompts({
          type: 'text',
          name: 'imageId',
          message: 'Enter the image id:'
        })
        args.imageId = response.imageId
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.images.retrieve(args.imageId, args.bookId)
      log(chalk.bold('🎇 - Image Retrieved!'))
      return formatReturnJSON(res)
    })
  })

images.command('update')
  .addOption(new Option('--book-id <bookId>'))
  .addOption(new Option('--image-id <imageId>'))
  .addOption(new Option('--image <image>'))
  .action(async (args) => {
    const {engineAPI} = await actionSetup()
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
      if (!args.imageId) {
        const response = await prompts({
          type: 'text',
          name: 'imageId',
          message: 'Enter the image id:'
        })
        args.imageId = response.imageId
      }
      if (args.image) {
        imageServerSchema.parse(JSON.parse(args.image))
      } else {
        const response = await prompts({
          type: 'text',
          name: 'image',
          message: 'Enter the image object:',
          validate: value => imageServerSchema.safeParse(JSON.parse(value)).success 
            ? true 
            : 'Please enter a image object'
        })
        args.image = response.image
      }
    })
    isValid && await handleAPIResponse(async () => {
      const res = await engineAPI.images.update(args.imageId, args.bookId, args.image)
      log(chalk.yellow.bold('🎇 - Image Updated!'))
      return formatReturnJSON(res)
    })
  })

images.command('delete')
  .addOption(new Option('--book-id <bookId>'))
  .addOption(new Option('--image-id <imageId>'))
  .action(async (args) => {
    const {engineAPI} = await actionSetup()
    const {isValid} = await validateArgs(async () => {
      if (!args.bookId) {
        const response = await prompts({
          type: 'text',
          name: 'bookId',
          message: 'Enter the Book id:'
        })
        args.bookId = response.bookId
      }
      if (!args.imageId) {
        const response = await prompts({
          type: 'text',
          name: 'imageId',
          message: 'Enter the image id:'
        })
        args.imageId = response.imageId
      }
    })
    isValid && await handleAPIResponse(async () => {
      await engineAPI.images.delete(args.imageId, args.bookId)
      log(chalk.bold('🗑️ - Image Deleted!'))
    })
  })
