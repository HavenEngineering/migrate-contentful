import myModule from "../src";

describe("Example tests", () => {
  it("should pass", () => {
    const result = myModule();
    expect(result).toEqual({
      message: "This is an example"
    });
  });
});
