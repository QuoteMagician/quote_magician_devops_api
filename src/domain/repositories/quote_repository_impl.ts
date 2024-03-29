import { QuoteDataSource } from "../../data/interfaces/data_sources/quote_data_source";
import { Quote } from "../entities/quote_entity";
import { QuoteRepository } from "../interfaces/repositories/quote_repository";

export class QuoteRepositoryImpl implements QuoteRepository {
  constructor(private quoteDataSource: QuoteDataSource) {}

  async create(quote: Quote): Promise<Quote> {
    const result = await this.quoteDataSource.create(quote);
    return result;
  }

  async getById(id: string): Promise<Quote> {
    const result = await this.quoteDataSource.getById(id);
    return result;
  }

  async getAll(): Promise<Quote[]> {
    const result = await this.quoteDataSource.getAll();
    return result;
  }

  async update(id: string, quote: Quote): Promise<Quote> {
    const result = await this.quoteDataSource.update(id, quote);
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.quoteDataSource.delete(id);
    return result;
  }
}
