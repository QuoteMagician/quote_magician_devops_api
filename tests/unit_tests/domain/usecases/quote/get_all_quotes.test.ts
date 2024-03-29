import { Quote } from "../../../../../src/domain/entities/quote_entity";
import { QuoteRepository } from "../../../../../src/domain/interfaces/repositories/quote_repository";

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

describe("Get All Quotes Usecase", () => {
  let quoteRepository: MockQuoteRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    quoteRepository = new MockQuoteRepository();
  });

  test("should get all quotes", async () => {
    const quotes: Quote[] = [
      { id: "1", text: "test", author: "test", likeCount: 1 },
      { id: "2", text: "test", author: "test", likeCount: 1 },
    ];
    jest.spyOn(quoteRepository, "getAll").mockResolvedValue(quotes);

    const allQuotes = await quoteRepository.getAll();

    expect(allQuotes).toEqual(quotes);
  });
});
