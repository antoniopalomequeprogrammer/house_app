import { login } from "../../utils/API_V2";

describe("Fetch API", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
});

test("Llamar api y devolver datos ", () => {
  fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

  login("prueba@prueba.com", 12345).then((response) => {
    expect(response.data).toEqueal("12345");
  });

  expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/login");
});
