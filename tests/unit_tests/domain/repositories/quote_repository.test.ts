import { QuoteDataSource } from "../../../../src/data/interfaces/data_sources/quote_data_source";
import { Quote } from "../../../../src/domain/entities/quote_entity";
import { QuoteRepository } from "../../../../src/domain/interfaces/repositories/quote_repository";
import { QuoteRepositoryImpl } from "../../../../src/domain/repositories/quote_repository_impl";

class MockQuoteDataSource implements QuoteDataSource {
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

describe("Quote Repository", () => {
  let quoteDataSource: MockQuoteDataSource;
  let quoteRepository: QuoteRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    quoteDataSource = new MockQuoteDataSource();
    quoteRepository = new QuoteRepositoryImpl(quoteDataSource);
  });

  describe("Create Quote", () => {
    test("should create a quote", async () => {
      const quote: Quote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(quoteDataSource, "create").mockResolvedValue(quote);

      const createdQuote = await quoteRepository.create(quote);
      expect(createdQuote).toStrictEqual(quote);
    });
  });

  describe("Get Quote By Id", () => {
    test("should get a quote by id", async () => {
      const quote: Quote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(quoteDataSource, "getById").mockResolvedValue(quote);

      const quoteById = await quoteRepository.getById("1");
      expect(quoteById).toStrictEqual(quote);
    });
  });

  describe("Get All Quotes", () => {
    test("should get all quotes", async () => {
      const quotes: Quote[] = [
        { id: "1", text: "test", author: "test", likeCount: 1 },
        { id: "2", text: "test", author: "test", likeCount: 1 },
      ];
      jest.spyOn(quoteDataSource, "getAll").mockResolvedValue(quotes);

      const allQuotes = await quoteRepository.getAll();
      expect(allQuotes).toStrictEqual(quotes);
    });
  });

  describe("Update Quote", () => {
    test("should update a quote", async () => {
      const quote: Quote = { id: "1", text: "test", author: "test", likeCount: 1 };
      jest.spyOn(quoteDataSource, "update").mockResolvedValue(quote);

      const updatedQuote = await quoteRepository.update("1", quote);
      expect(updatedQuote).toStrictEqual(quote);
    });
  });

  describe("Delete Quote", () => {
    test("should delete a quote", async () => {
      jest.spyOn(quoteDataSource, "delete").mockResolvedValue(true);

      const isDeleted = await quoteRepository.delete("1");
      expect(isDeleted).toBe(true);
    });
  });
});
