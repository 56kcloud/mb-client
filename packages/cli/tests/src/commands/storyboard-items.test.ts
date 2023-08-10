import '../../../src/commands/storyboard-items'
import {describe, expect, test, vi} from 'vitest'
import {fetchMocker} from '@/core/tests/mocks/fetch'
import {formatReturnJSON} from '@/core/utils/toolbox'
import {mockProcessExit} from 'vitest-mock-process'
import {program} from 'commander'
import {storyboardItemServerFactory} from '@/core/tests/factories/storyboard-item.factory'

mockProcessExit()
vi.mock('prompts', async () => {
  return {
    default: () => Promise.resolve({
      bookId: 'ABC'
    })
  }
})
describe('Storyboard Items', () => {
  const logSpy = vi.spyOn(console, 'log')
  test('get without args', async () => {
    const storyboardItems = [storyboardItemServerFactory(), storyboardItemServerFactory()]
    fetchMocker.mockResponse(JSON.stringify(storyboardItems))
    await program.parseAsync(['storyboard-items', 'get'], {from: 'user'})
    expect(logSpy.mock.calls[0][0]).toStrictEqual(formatReturnJSON(storyboardItems))
  })

  test('get', async () => {
    const storyboardItems = [storyboardItemServerFactory(), storyboardItemServerFactory()]
    fetchMocker.mockResponse(JSON.stringify(storyboardItems))
    await program.parseAsync(['storyboard-items', 'get', '--book-id', 'book.id'], {from: 'user'})
    expect(logSpy.mock.calls[1][0]).toStrictEqual(formatReturnJSON(storyboardItems))
  })
})
