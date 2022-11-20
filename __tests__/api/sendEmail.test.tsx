import axios from "axios";

describe("Testing POST / endpoint", () => {
  const url = "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";

  it("it should return status code 200 status. If everything is correct", async () => {
    const result = await axios.post(url, {
      name: "Test Full Name",
      email: "test@gmail.com",
    });
    expect(result.status).toBe(200);
  });
});
