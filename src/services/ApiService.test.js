import { fetchData } from "./ApiService";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks(); // Enable fetch mocking

describe("ApiService", () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Reset fetch mocks before each test
  });

  it("fetches data successfully from API", async () => {
    const mockData = [
      { id: 1, name: "University 1" },
      { id: 2, name: "University 2" },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchData();
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
    );
  });

  it("handles API fetch error", async () => {
    fetchMock.mockRejectOnce(new Error("API fetch failed"));

    await expect(fetchData()).rejects.toThrow("API fetch failed");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
