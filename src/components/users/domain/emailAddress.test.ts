import { describe, it, expect } from "vitest";
import { EmailAddress } from "./emailAddress";

describe("The EmailAddress value object", () => {
  describe("when being created", () => {
    it("should return a successful result with an EmailAddress object", () => {
      const emailAddress = "example@example.com";
      const vo = EmailAddress.create(emailAddress);

      expect(vo.isSuccess).toBe(true);
      expect(vo.isFailure).toBe(false);
      expect(vo.getValue()).toBeInstanceOf(EmailAddress);
      expect(vo.getValue().value).toBe(emailAddress);
    });

    it("should return a failed result if the given string is not formatted as an email address", () => {
      const emailAddress = "Hello World!";
      const vo = EmailAddress.create(emailAddress);

      expect(vo.isSuccess).toBe(false);
      expect(vo.isFailure).toBe(true);
      expect(() => vo.getValue()).toThrow();
      expect(vo.error).toBeDefined();
      expect(vo.errorValue).toBeDefined();
    });
  });
});
