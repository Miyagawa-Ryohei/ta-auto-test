
describe('PythagorasServletTest', () => {
  let errors : string[]= []
  beforeEach(async () => {
    errors = []
    await page.goto('http://localhost:8080/first_webapp/PythagorasServlet?a=3&b=4',{waitUntil: "networkidle2"})
  })

  test('GetCalcResult', async () => {
    const result = 'p'
    try {
      const calciResult = await page.$eval<string>(result, e => {
        return e.textContent || ""
      })
    } catch (e) {
      errors.push("計算結果はpタグを使用してください。 : " + e)
    }
    if (errors.length) {
      throw ("- " + errors.join("\n- "))
    }
  })

})