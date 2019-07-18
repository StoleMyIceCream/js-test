const assert = require('assert')
const rp = require('request-promise')

describe('object operations', () => {
  let data

  before(async () => {
    /**
     * INSTRUCTIONS:
     *
     * - Visit https://www.coindesk.com/api
     * - You will find "Historical BPI data" at the bottom of the page with instructions on composing the query
     * - Make a request for prices between January 1, 2019 - January 31, 2019
     * - Populate the params to complete the request (you don't have to use the `url` package)
     * - Attach the response to the data variable defined above
     */
    const params = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-01-31' // TODO:
    const result = await rp(params)
    result1 = JSON.parse(result)
    data = result1.bpi
    //console.log(data)
  })

  it('should receive correct data', () => {
    /**
     * This first test has been completed.
     * It should pass if the query from step 1 is acurate.
     */
    const exists = data.hasOwnProperty('2019-01-01')
    assert.ok(exists)
  })

  it('should handle basic arithmetic', () => {
    /**
     * INSTRUCTIONS:
     *
     * Return the sum of all values
     * See expected result below
     */
    const actual = obj => Object.values(obj).reduce((a, b) => a + b); // TODO:
    const expected = 114390.02239999999
    assert.strictEqual(actual(data), expected)
  })

  it('should handle finding', () => {
    /**
     * INSTRUCTIONS:
     *
     * Find the top value (Number) from any date
     * See expected result below
     */
    let actual = Object.values(data) // TODO:
    actual.sort(function(a,b){return b-a})
    const expected = 4083.165
    assert.equal(actual[0], expected)
  })

  it('should extract results', () => {
    /**
     * INSTRUCTIONS:
     *
     * Extract only the results from Mondays
     * See expected result below
     */
    let mondays = []  
    for (let key in data){
      let d = new Date (key)
      if (d.getDay() == 2)
        mondays.push(d)
    }
    
    mondays = mondays.map(function formatDateToString(date){
      var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
      var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
      var yyyy = date.getFullYear();
      return (yyyy + "-" + MM + "-" + dd);
    })
    let actual = {}
    for(const i of mondays){
      actual[i] = data[i]
    }  // TODO:
    const expected = {
      '2019-01-01': 3869.47,
      '2019-01-08': 4029.9917,
      '2019-01-15': 3604.1333,
      '2019-01-22': 3598.2183,
      '2019-01-29': 3421.12
    }
    assert.deepEqual(actual, expected)
  })

  it('should handle sorting', () => {
    /**
     * INSTRUCTIONS:
     *
     * Return the top 5 dates in descending order
     * See expected result below
     */
    const expected = {
      '2019-01-06': 4083.165,
      '2019-01-07': 4041.4583,
      '2019-01-08': 4029.9917,
      '2019-01-09': 4028.2917,
      '2019-01-02': 3941.2167
    }
    let actual_sort = Object.keys(data).map(function(key){
      return [key,data[key]]
    }) // TODO:
    actual_sort.sort(function(a,b){return b[1]-a[1]})
    actual_sort = actual_sort.slice(0,5)
    let actual= {}
    for(const i of actual_sort){
      actual[i[0]] = i[1]
    }
    assert.deepEqual(actual, expected)
  })
})