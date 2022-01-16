
describe('TaskListTest', () => {
  const resultList = ["末吉","小吉","吉","中吉","大吉", "凶"]
  beforeEach(async () => {
    await page.goto('http://localhost:8080/first_webapp/omikuji.jsp',{waitUntil: "networkidle2"})
  })

  test('GetOmikujiResult', async () => {
    const errors : string[] = []
    const input = 'input[name="username"]'
    const submit = 'button[type="submit"]'
    const resultTitle = 'h1'
    const result = 'p'
    const uname = "aaa"
    await page.type(input,uname);
    await page.click(submit);
    const resRegx = new RegExp(uname + "さんの今日の運勢は("+resultList.join("|")+")です。")
    try {
      const title = await page.$eval<string>(resultTitle, e => {
        return e.textContent || ""
      })
      if(title !== "おみくじの結果") {
        errors.push("おみくじ結果ページのタイトルが使用どおりになっていません。出力 : "　+ title)
      }
    } catch (e) {
      errors.push("「おみくじ結果」はh1タグを使用してください。")
    }
    try {
      const omikujiResult = await page.$eval<string>(result, e => {
        return e.textContent || ""
      })
      if(!resRegx.test(omikujiResult)) {
        errors.push("おみくじ結果の出力フォーマットが異なっています\n\t出力結果   " + omikujiResult)
      }else {
        const ans = resRegx.exec(omikujiResult)
        const luck = ans![1];
        if(!resultList.some(s => s=== luck) ){
          errors.push("おみくじ結果は以下の6種類のいずれかになります。\n\t" + resultList.join("\n+\t") + "\n 出力結果 : " + luck)
        }
      }
    } catch (e) {
      errors.push("おみくじ結果はpタグを使用してください。 : " + e)
    }
    if (errors.length) {
      throw ("- " + errors.join("\n- "))
    }
  })


  test('GetOmikujiByKanaName', async () => {
    const errors : string[] = []
    const adovice : string[] = []
    const input = 'input[name="username"]'
    const submit = 'button[type="submit"]'
    const resultTitle = 'h1'
    const result = 'p'
    const uname = "あああ"
    await page.type(input,"あああ");
    await page.click(submit);
    const resRegx = new RegExp(uname + "さんの今日の運勢は("+resultList.join("|")+")です。")
    try {
      const title = await page.$eval<string>(resultTitle, e => {
        return e.textContent || ""
      })
      if(title !== "おみくじの結果") {
        errors.push("おみくじ結果ページのタイトルが使用どおりになっていません。出力 : "　+ title)
      }
    } catch (e) {
      errors.push("「おみくじ結果」はh1タグを使用してください。")
    }
    try {
      const omikujiResult = await page.$eval<string>(result, e => {
        return e.textContent || ""
      })
      if(!resRegx.test(omikujiResult)) {
        adovice.push("日本語名が文字化けしています。EncodingFilterを導入すると解決できます。 : " + omikujiResult)
      }
    } catch (e) {
      errors.push("おみくじ結果はpタグを使用してください。 : " + e)
    }
    if (errors.length) {
      throw ("- " + errors.join("\n- "))
    }
    if (adovice.length) {
      console.log("## アドバイス \n- " + adovice.join("\n- "))
    }
  })

  test('GetRandomResult', async () => {
    const errors : string[] = []
    const input = 'input[name="username"]'
    const submit = 'button[type="submit"]'
    const resultTitle = 'h1'
    const result = 'li'
    const uname = ""
    const getOmikujiResult = async () => {
      await page.goto('http://localhost:8080/first_webapp/omikuji.jsp',{waitUntil: "networkidle2"})
      await page.type(input,uname);
      await page.click(submit);
      try {
        const title = await page.$eval<string>(resultTitle, e => {
          return e.textContent || ""
        })
        if(title !== "入力内容にエラーがあります") {
          errors.push("エラータイトルが仕様どおりになっていません。出力 : "　+ title)
        }
      } catch (e) {
        errors.push("エラータイトルはh1タグを使用してください。")
      }
      try {
        const errorMessage = await page.$eval<string>(result, e => {
          return e.textContent || ""
        })
        if(errorMessage !== "氏名を入力してください") {
          errors.push("エラーメッセージが異なっています\n\t出力結果   " + errorMessage)
        }
      } catch (e) {
        errors.push("エラーメッセージはliタグを使用してください。 : " + e)
      }
    }

    await getOmikujiResult()
    if (errors.length) {
      throw ("- " + errors.join("\n- "))
    }
  })

  jest.setTimeout(30000)
  test('GetRandomResult', async () => {
    const errors : string[] = []
    const input = 'input[name="username"]'
    const submit = 'button[type="submit"]'
    const resultTitle = 'h1'
    const result = 'p'
    const uname = "aaa"
    const resRegx = new RegExp(uname + "さんの今日の運勢は("+resultList.join("|")+")です。")
    const getOmikujiResult = async () => {
      await page.goto('http://localhost:8080/first_webapp/omikuji.jsp',{waitUntil: "networkidle2"})
      await page.type(input,uname);
      await page.click(submit);
      try {
        const title = await page.$eval<string>(resultTitle, e => {
          return e.textContent || ""
        })
        if(title !== "おみくじの結果") {
          errors.push("おみくじ結果ページのタイトルが使用どおりになっていません。出力 : "　+ title)
        }
      } catch (e) {
        errors.push("「おみくじ結果」はh1タグを使用してください。")
      }
      try {
        const omikujiResult = await page.$eval<string>(result, e => {
          return e.textContent || ""
        })
        if(!resRegx.test(omikujiResult)) {
          errors.push("おみくじ結果の出力フォーマットが異なっています\n\t出力結果   " + omikujiResult)
        }else {
          const ans = resRegx.exec(omikujiResult)
          return ans![1];
        }
      } catch (e) {
        errors.push("おみくじ結果はpタグを使用してください。 : " + e)
      }
    }

    let result_base = await getOmikujiResult()
    for(let i = 0; i < 20; i++) {
      let comp_result = await getOmikujiResult()
      if(result_base !== comp_result) {
        break;
      }
      if( i === 19) {
        errors.push("おみくじ結果がランダムになっていません。20回連続で同じ値がでています。")
      }
      result_base = comp_result
    }
    if (errors.length) {
      throw ("- " + errors.join("\n- "))
    }
  })
})