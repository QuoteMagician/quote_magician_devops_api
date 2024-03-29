import { Quote } from "../../domain/entities/quote_entity";
import { DatabaseWrapper } from "../interfaces/data_sources/database_wrapper";
import { QuoteDataSource } from "../interfaces/data_sources/quote_data_source";

export class MongoDBAtlasQuoteDataSource implements QuoteDataSource {
  constructor(private database: DatabaseWrapper) {}

  async create(quote: Quote): Promise<Quote> {
    const result = await this.database.insertOne(quote);
    const quoteId: string = result["insertedId"];
    return this.getById(quoteId);
  }

  async getById(id: string): Promise<Quote> {
    const result = await this.database.findOne(id);
    return this.getMappedDatabaseScheme(result);
  }

  async getAll(): Promise<Quote[]> {
    const result = await this.database.find({});
    const formattedResults: Quote[] = result.map((quote: any) => {
      return this.getMappedDatabaseScheme(quote);
    });

    return formattedResults;
  }

  async update(id: string, quote: Quote): Promise<Quote> {
    await this.database.updateOne(id, quote);
    const updatedQuote = await this.getById(id);
    return updatedQuote;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.database.deleteOne(id);
    const isDeleted: boolean = result["deletedCount"] !== 0;
    return isDeleted;
  }

  private getMappedDatabaseScheme(quote: any): Quote {
    return {
      id: quote._id,
      text: quote.text,
      author: quote.author,
      likeCount: quote.likeCount,
    };
  }
}
