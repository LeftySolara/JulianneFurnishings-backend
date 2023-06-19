import { describe, it, expect } from "vitest";
import { Name } from "./name";

describe("The Name value object", () => {
  describe("when being created", () => {
    it("should return a successful result with a Name object", () => {
      const name = "example";
      const vo = Name.create(name);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(Name);
      expect(vo.getValue().value).toBe(name);
    });

    it("should return a failed result if the given string is longer than 45 characters", () => {
      const name = (() => {
        let result = "";
        const characters = "abcde";
        let counter = 0;
        while (counter <= 45) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length),
          );
          counter += 1;
        }
        return result;
      })();

      const vo = Name.create(name);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
