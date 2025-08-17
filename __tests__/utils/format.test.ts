import {
  formatVNDCurrency,
  formatUSDCurrency,
  calculateTimeLeft,
} from "../../libs/common/formats"

describe("Format Utils", () => {
  describe("formatVNDCurrency", () => {
    it("should format VND currency correctly", () => {
      const result = formatVNDCurrency(1000000)
      expect(result).toContain("1.000.000")
      expect(result).toContain("₫")
    })

    it("should handle zero value", () => {
      const result = formatVNDCurrency(0)
      expect(result).toContain("0")
      expect(result).toContain("₫")
    })

    it("should handle negative value", () => {
      const result = formatVNDCurrency(-50000)
      expect(result).toContain("-50.000")
      expect(result).toContain("₫")
    })
  })

  describe("formatUSDCurrency", () => {
    it("should format USD currency correctly", () => {
      const result = formatUSDCurrency(1000000)
      expect(result).toBe("1,000,000.00")
    })

    it("should handle string input", () => {
      const result = formatUSDCurrency("1000000")
      expect(result).toBe("1,000,000.00")
    })

    it("should handle zero value", () => {
      const result = formatUSDCurrency(0)
      expect(result).toBe("0.00")
    })
  })

  describe("calculateTimeLeft", () => {
    it("should calculate time left correctly", () => {
      const futureTime = new Date(Date.now() + 3661000).toISOString() // 1 hour + 1 minute + 1 second
      const result = calculateTimeLeft(futureTime)
      expect(result).toContain("1h")
      expect(result).toContain("m")
      expect(result).toContain("s")
    })

    it("should return empty string for past time", () => {
      const pastTime = new Date(Date.now() - 1000).toISOString()
      const result = calculateTimeLeft(pastTime)
      expect(result).toBe("")
    })
  })
})
