import { Quote } from "../../domain/entities/quote_entity";
import { DatabaseWrapper } from "../interfaces/data_sources/database_wrapper";
import { QuoteDataSource } from "../interfaces/data_sources/quote_data_source";
import { Logger } from "../../utils/logger";

export class MongoDBAtlasQuoteDataSource implements QuoteDataSource {
  constructor(private database: DatabaseWrapper) {}

  async create(quote: Quote): Promise<Quote> {
    Logger.log("Creating quote");
    Logger.log(JSON.stringify(quote));

    const result = await this.database.insertOne(quote);
    const quoteId: string = result["insertedId"];
    const createdQuote = await this.getById(quoteId);

    Logger.log("Created quote");
    Logger.log(JSON.stringify(createdQuote));

    return createdQuote;
  }

  async getById(id: string): Promise<Quote> {
    Logger.log("Getting quote by id");
    Logger.log(id);

    const result = await this.database.findOne(id);

    Logger.log("Got quote by id");
    Logger.log(JSON.stringify(result));

    return this.getMappedDatabaseScheme(result);
  }

  async getAll(): Promise<Quote[]> {
    Logger.log("Getting all quotes");

    const result = await this.database.find({});
    const formattedResults: Quote[] = result.map((quote: any) => {
      return this.getMappedDatabaseScheme(quote);
    });

    Logger.log("Got all quotes");
    Logger.log(JSON.stringify(formattedResults));

    return formattedResults;
  }

  async update(id: string, quote: Quote): Promise<Quote> {
    Logger.log("Updating quote");
    Logger.log(id);
    Logger.log(JSON.stringify(quote));

    await this.database.updateOne(id, quote);
    const updatedQuote = await this.getById(id);

    Logger.log("Updated quote");
    Logger.log(JSON.stringify(updatedQuote));

    return updatedQuote;
  }

  async delete(id: string): Promise<boolean> {
    Logger.log("Deleting quote");
    Logger.log(id);

    const result = await this.database.deleteOne(id);

    Logger.log("Deleted quote");
    Logger.log(JSON.stringify(result));

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
