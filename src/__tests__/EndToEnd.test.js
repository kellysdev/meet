import puppeteer from "puppeteer"

// Feature 1
describe("filter events by city", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("when a user hasn't selected a city, show events from all cities", async () => {
    const eventListLength = await page.evaluate(() => {
      return document.querySelectorAll(".event").length;
    });
    expect(eventListLength).toBe(32);
  });

  test("user should be able to see a list of suggestions when they search for a city", async () => {
    await page.type(".city", "Berlin");
    await page.waitForSelector(".suggestion-item");
    const suggestion = await page.$(".suggestion-item");
    expect(suggestion).toBeDefined();
  }, 17000);

  test("user can select a city from the suggested list", async () => {
    await page.click(".suggestion-item");

    const eventListLength = await page.evaluate(() => {
      return document.querySelectorAll(".event").length;
    });
    expect(eventListLength).toBe(16);
  });

});

// Feature 2
describe("show/hide an event details", () =>{
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .show-details");
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .hide-details");
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });
});