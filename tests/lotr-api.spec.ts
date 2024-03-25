import { test, expect, APIRequestContext } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

test.describe('API - Lord of the Rings', () => {
  let lotrAPI: APIRequestContext

  test('Should match Aragorn character object information', async ({
    playwright,
  }) => {
    lotrAPI = await playwright.request.newContext({
      baseURL: 'https://the-one-api.dev/v2/',
      extraHTTPHeaders: {
        Authorization: `Bearer ${process.env.LOTR_API_KEY}`,
      },
    })

    const response = await lotrAPI.get(`character/`)
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()

    const currentAragorn = await responseBody.docs.find(
      (character: { name: string }) => character.name === 'Aragorn II Elessar',
    )
    const expectedAragorn = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, './fixtures/lotr/aragorn.json'),
        'utf8',
      ),
    )

    expect(currentAragorn).toEqual(expectedAragorn)
  })
})
