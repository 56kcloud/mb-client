import {EngineAPI, BaseEndpointProps} from '..'
import {StoryboardItem, StoryboardItemSchema} from '../../storyboard-item'
import {handleAsyncFunction, snakeCaseObjectKeysToCamelCase} from '@/core/utils/toolbox'
import {z} from 'zod'

type listProps = BaseEndpointProps & {
  bookId: string
}
export class StoryboardItemsEndpoints {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly engineAPI: EngineAPI) {
  }

  list(props: listProps): Promise<Array<StoryboardItem>> {
    return handleAsyncFunction(async () => {
      let res = (await this.engineAPI.fetcher.call<Promise <Record<string, unknown>>>({
        path: `/v1/storyboarditems/book/${props.bookId}`
      })) as Record<string, unknown>
      return z.array(StoryboardItemSchema).parse(snakeCaseObjectKeysToCamelCase(res))
    })
  }

}
