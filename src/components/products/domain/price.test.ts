import { describe, it, expect } from "vitest";
import { Price } from "./price";

describe("The Price value object", () => {
  describe("when being created", () => {
    it("should return a successful result with a Price object", () => {
      const price = 100.25;
      const vo = Price.create(price);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(Price);
      expect(vo.getValue().value).toBe(price);
    });

    it("should return a failed result if the given price is less than 0", () => {
      const price = -1;
      const vo = Price.create(price);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
