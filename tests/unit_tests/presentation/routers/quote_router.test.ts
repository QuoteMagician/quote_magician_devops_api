import { Quote } from "../../../../src/domain/entities/quote_entity";
import { CreateQuoteUseCase } from "../../../../src/domain/interfaces/usecases/quote/create_quote";
import { DeleteQuoteUseCase } from "../../../../src/domain/interfaces/usecases/quote/delete_quote";
import { GetAllQuotesUseCase } from "../../../../src/domain/interfaces/usecases/quote/get_all_quotes";
import { GetQuoteByIdUseCase } from "../../../../src/domain/interfaces/usecases/quote/get_quote_by_id";
import { UpdateQuoteUseCase } from "../../../../src/domain/interfaces/usecases/quote/update_quote";
import QuoteRouter from "../../../../src/presentation/routers/quote_router";
import server from "../../../../src/server";
import request from "supertest";

class MockCreateQuoteUseCase implements CreateQuoteUseCase {
  execute(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
}

class MockGetQuoteByIdUseCase implements GetQuoteByIdUseCase {
  execute(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
}

class MockGetAllQuotesUseCase implements GetAllQuotesUseCase {
  execute(): Promise<Quote[]> {
    throw new Error("Method not implemented.");
  }
}

class MockUpdateQuoteUseCase implements UpdateQuoteUseCase {
  execute(): Promise<Quote> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteQuoteUseCase implements DeleteQuoteUseCase {
  execute(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("QuoteRouter", () => {
  let createQuoteUseCase: CreateQuoteUseCase;
  let getQuoteByIdUseCase: GetQuoteByIdUseCase;
  let getAllQuotesUseCase: GetAllQuotesUseCase;
  let updateQuoteUseCase: UpdateQuoteUseCase;
  let deleteQuoteUseCase: DeleteQuoteUseCase;

  beforeAll(() => {
    createQuoteUseCase = new MockCreateQuoteUseCase();
    getQuoteByIdUseCase = new MockGetQuoteByIdUseCase();
    getAllQuotesUseCase = new MockGetAllQuotesUseCase();
    updateQuoteUseCase = new MockUpdateQuoteUseCase();
    deleteQuoteUseCase = new MockDeleteQuoteUseCase();
    server.use(
      "/quotes",
      QuoteRouter(
        createQuoteUseCase,
        getQuoteByIdUseCase,
        getAllQuotesUseCase,
        updateQuoteUseCase,
        deleteQuoteUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /quotes", () => {
    test("should return 201 with data when quote is created", async () => {
      const expected = {
        id: "1",
        text: "test",
        author: "test",
        likeCount: 1,
      };
      jest.spyOn(createQuoteUseCase, "execute").mockResolvedValue(expected);

      const response = await request(server).post("/quotes").send(expected);

      expect(response.status).toBe(201);
      expect(createQuoteUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expected);
    });

    test("should return 500 with error message when quote is not created", async () => {
      jest.spyOn(createQuoteUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/quotes").send({});

      expect(response.status).toBe(500);
      expect(createQuoteUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /quotes/:id", () => {
    test("should return 200 with data when quote is found", async () => {
      const expected = {
        id: "1",
        text: "test",
        author: "test",
        likeCount: 1,
      };
      jest.spyOn(getQuoteByIdUseCase, "execute").mockResolvedValue(expected);

      const response = await request(server).get("/quotes/1");

      expect(response.status).toBe(200);
      expect(getQuoteByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expected);
    });

    test("should return 500 with error message when quote is not found", async () => {
      jest.spyOn(getQuoteByIdUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/quotes/1");

      expect(response.status).toBe(500);
      expect(getQuoteByIdUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("GET /quotes", () => {
    test("should return 200 with data when quotes are found", async () => {
      const expected = [
        {
          id: "1",
          text: "test",
          author: "test",
          likeCount: 1,
        },
        {
          id: "2",
          text: "test2",
          author: "test2",
          likeCount: 2,
        },
      ];
      jest.spyOn(getAllQuotesUseCase, "execute").mockResolvedValue(expected);

      const response = await request(server).get("/quotes");

      expect(response.status).toBe(200);
      expect(getAllQuotesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expected);
    });

    test("should return 500 with error message when quotes are not found", async () => {
      jest.spyOn(getAllQuotesUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).get("/quotes");

      expect(response.status).toBe(500);
      expect(getAllQuotesUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("PUT /quotes/:id", () => {
    test("should return 200 with data when quote is updated", async () => {
      const expected = {
        id: "1",
        text: "test",
        author: "test",
        likeCount: 1,
      };
      jest.spyOn(updateQuoteUseCase, "execute").mockResolvedValue(expected);

      const response = await request(server).put("/quotes/1").send(expected);

      expect(response.status).toBe(200);
      expect(updateQuoteUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expected);
    });

    test("should return 500 with error message when quote is not updated", async () => {
      jest.spyOn(updateQuoteUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).put("/quotes/1").send({});

      expect(response.status).toBe(500);
      expect(updateQuoteUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("DELETE /quotes/:id", () => {
    test("should return 204 when quote is deleted", async () => {
      jest.spyOn(deleteQuoteUseCase, "execute").mockResolvedValue(true);

      const response = await request(server).delete("/quotes/1");

      expect(response.status).toBe(204);
      expect(deleteQuoteUseCase.execute).toHaveBeenCalledTimes(1);
    });

    test("should return 500 with error message when quote is not deleted", async () => {
      jest.spyOn(deleteQuoteUseCase, "execute").mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/quotes/1");

      expect(response.status).toBe(500);
      expect(deleteQuoteUseCase.execute).toHaveBeenCalledTimes(1);
      expect(response.body).toHaveProperty("message");
    });
  });
});
