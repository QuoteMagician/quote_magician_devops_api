import { Quote } from "../../../domain/entities/quote_entity";

export interface QuoteDataSource {
  create(quote: Quote): Promise<Quote>;
  getById(id: string): Promise<Quote>;
  getAll(): Promise<Quote[]>;
  update(id: string, quote: Quote): Promise<Quote>;
  delete(id: string): Promise<boolean>;
}
