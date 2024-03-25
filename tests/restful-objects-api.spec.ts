import { test, expect, APIRequest, APIRequestContext } from '@playwright/test'

let restfulApi: APIRequestContext
let postId

test.describe('API - Objects', () => {
  test.beforeEach(async ({ playwright }) => {
    restfulApi = await playwright.request.newContext({
      baseURL: 'https://api.restful-api.dev/',
    })

    const postRequestData = {
      name: 'Play X6 Pro',
      data: {
        color: 'Cloudy White',
        capacity: '128 GB',
      },
    }

    const postResponse = await restfulApi.post('objects', {
      data: postRequestData,
    })

    expect(postResponse.ok()).toBeTruthy()

    const postResponseBody = await postResponse.json()
    postId = postResponseBody.id
  })

  test('Should update totally and object', async () => {
    const requestPutData = {
      name: 'Play X5',
      data: {
        color: 'Black Pearl',
        capacity: '32 GB',
      },
    }

    const putResponse = await restfulApi.put(`objects/${postId}`, {
      data: requestPutData,
    })

    expect(putResponse.ok()).toBeTruthy()

    const putResponseBody = await putResponse.json()

    expect(putResponseBody.name).toBe(requestPutData.name)
    expect(putResponseBody.data.color).toBe(requestPutData.data.color)
    expect(putResponseBody.data.capacity).toBe(requestPutData.data.capacity)
  })

  test('Should update partially and object', async () => {
    const patchResponse = await restfulApi.patch(`objects/${postId}`, {
      data: {
        name: 'Play X6',
      },
    })

    expect(patchResponse.ok()).toBeTruthy()

    const putResponseBody = await patchResponse.json()
    expect(putResponseBody.name).toBe('Play X6')
  })

  test('Should delete an object', async () => {
    const deleteResponse = await restfulApi.delete(`objects/${postId}`)

    expect(deleteResponse.ok()).toBeTruthy()

    const getResponse = await restfulApi.get(`todos/${postId}`)
    expect(getResponse.status()).toBe(404)
  })
})
