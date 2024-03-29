import { Quote } from "../../entities/quote_entity";

export interface QuoteRepository {
  create(quote: Quote): Promise<Quote>;
  getById(id: string): Promise<Quote>;
  getAll(): Promise<Quote[]>;
  update(id: string, quote: Quote): Promise<Quote>;
  delete(id: string): Promise<boolean>;
}
