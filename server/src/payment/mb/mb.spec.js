const { findId } = require("./mb")

describe("findId", () => {
  it("should return the missing number on the sequence", () => {
    const refIds = [16, 2, 1, 10, 6, 20, 4, 15, 8, 11, 5, 9, 7, 18, 19]

    let expected = 0
    let result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 3
    result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 12
    result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 13
    result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 14
    result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 17
    result = findId(refIds)
    expect(result).toEqual(expected)

    refIds.push(result)
    expected = 21
    result = findId(refIds)
    expect(result).toEqual(expected)
  })

  it("should return 0", () => {
    const refIds = []
    const expected = 0
    const result = findId(refIds)
    expect(result).toEqual(expected)
  })
})
