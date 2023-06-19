import { describe, it, expect } from "vitest";
import { HashedPassword } from "./hashedPassword";

describe("The HashedPassword value object", () => {
  describe("when being created", () => {
    it("should return a successful result with a HashedPassword object", () => {
      const hashedPassword = (() => {
        let result = "";
        const characters = "abcde";
        let counter = 0;
        while (counter < 60) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
          counter += 1;
        }
        return result;
      })();

      const vo = HashedPassword.create(hashedPassword);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(HashedPassword);
      expect(vo.getValue().value).toBe(hashedPassword);
    });

    it("should return a failed result if the given string is not exactly 60 characters long", () => {
      const hashedPassword = "Hello World";
      const vo = HashedPassword.create(hashedPassword);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
