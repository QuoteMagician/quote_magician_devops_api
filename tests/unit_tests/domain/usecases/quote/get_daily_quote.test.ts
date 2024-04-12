import { Quote } from "../../../../../src/domain/entities/quote_entity";
import { QuoteRepository } from "../../../../../src/domain/interfaces/repositories/quote_repository";
import { GetDailyQuoteUseCase } from "../../../../../src/domain/interfaces/usecases/quote/get_daily_quote";
import { GetDailyQuote } from "../../../../../src/domain/usecases/quote/get_daily_quote";

export class MockQuoteRepository implements QuoteRepository {
  create(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  getById(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<Quote[]> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("Get Daily Quote Usecase", () => {
  let quoteRepository: MockQuoteRepository;
  let usecase: GetDailyQuoteUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    quoteRepository = new MockQuoteRepository();
    usecase = new GetDailyQuote(quoteRepository, new Date());
  });

  test("should get a daily quote", async () => {
    usecase = new GetDailyQuote(quoteRepository, new Date());

    const quotes: Quote[] = [
      { id: "1", text: "test", author: "test", likeCount: 1 },
      { id: "2", text: "test", author: "test", likeCount: 1 },
    ];
    jest.spyOn(quoteRepository, "getAll").mockResolvedValue(quotes);

    const dailyQuote = await usecase.execute();

    expect(quotes).toContainEqual(dailyQuote);
  });

  test("should get the same daily quote on the same day", async () => {
    const quotes: Quote[] = [
      { id: "1", text: "test", author: "test", likeCount: 1 },
      { id: "2", text: "test", author: "test", likeCount: 1 },
      { id: "3", text: "test", author: "test", likeCount: 1 },
      { id: "4", text: "test", author: "test", likeCount: 1 },
    ];
    jest.spyOn(quoteRepository, "getAll").mockResolvedValue(quotes);

    const dailyQuote1 = await usecase.execute();
    const dailyQuote2 = await usecase.execute();

    expect(dailyQuote1).toEqual(dailyQuote2);
  });
});
