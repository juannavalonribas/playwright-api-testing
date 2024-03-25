import { test, expect, APIRequestContext } from '@playwright/test'

test.describe('API - Users', () => {
  let jsonUsersApi: APIRequestContext

  test('Check user results structure', async ({ playwright }) => {
    jsonUsersApi = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com/',
    })

    const response = await jsonUsersApi.get('users')
    expect(response.ok()).toBeTruthy()

    const responseBody = await response.json()

    expect(responseBody).toContainEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        address: expect.objectContaining({
          street: expect.any(String),
          suite: expect.any(String),
          city: expect.any(String),
          zipcode: expect.any(String),
          geo: expect.objectContaining({
            lat: expect.any(String),
            lng: expect.any(String),
          }),
        }),
        phone: expect.any(String),
        website: expect.any(String),
        company: expect.objectContaining({
          name: expect.any(String),
          catchPhrase: expect.any(String),
          bs: expect.any(String),
        }),
      }),
    )
  })
})
