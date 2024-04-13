import * as dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { DatabaseWrapper } from "./data/interfaces/data_sources/database_wrapper";
import { QuoteDataSource } from "./data/interfaces/data_sources/quote_data_source";
import { MongoDBAtlasQuoteDataSource } from "./data/data_sources/mongodb_atlas_quote_data_source";
import QuoteRouter from "./presentation/routers/quote_router";
import { CreateQuote } from "./domain/usecases/quote/create_quote";
import { QuoteRepositoryImpl } from "./domain/repositories/quote_repository_impl";
import { QuoteRepository } from "./domain/interfaces/repositories/quote_repository";
import { GetQuoteById } from "./domain/usecases/quote/get_quote_by_id";
import { GetAllQuotes } from "./domain/usecases/quote/get_all_quotes";
import { UpdateQuote } from "./domain/usecases/quote/update_quote";
import { DeleteQuote } from "./domain/usecases/quote/delete_quote";
import server from "./server";
import { GetDailyQuote } from "./domain/usecases/quote/get_daily_quote";
import HealthRouter from "./presentation/routers/health_router";
import { Logger } from "./utils/logger";

dotenv.config();

const mongodbAtlasUsername: string = process.env.MONGODB_ATLAS_USERNAME ?? "-1";
const mongodbAtlasPassword: string = process.env.MONGODB_ATLAS_PASSWORD ?? "-1";
const serverPort: number = parseInt(process.env.SERVER_PORT ?? "4000");

const mongodbClusterUri: string = `mongodb+srv://${mongodbAtlasUsername}:${mongodbAtlasPassword}@quotecluster.nkobxif.mongodb.net/?retryWrites=true&w=majority&appName=QuoteCluster`;
const quotesDatabaseName: string = "quotes_db";
const quotesCollectionName: string = "quotes";

console.log("Connecting to MongoDB using the following URI: ", mongodbClusterUri);

const mongodbClient = new MongoClient(mongodbClusterUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await mongodbClient.connect();
    const mongodbQuotesDB = await mongodbClient.db(quotesDatabaseName);
    console.log("Connected to MongoDB!");

    const quotesCollection = await mongodbQuotesDB.collection(quotesCollectionName);
    console.log(`Connected to collection: ${quotesCollectionName}`);

    const quotesDatabase: DatabaseWrapper = {
      insertOne: async (doc: any) => quotesCollection.insertOne(doc),
      find: async (query: any) => quotesCollection.find(query).toArray(),
      findOne: async (id: string) => quotesCollection.findOne({ _id: new ObjectId(id) }),
      updateOne: async (id: string, data: any) => {
        const result = await quotesCollection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        return result;
      },
      deleteOne: async (id: string) => {
        const result = await quotesCollection.deleteOne({ _id: new ObjectId(id) });
        return result;
      },
    };

    const quoteDataSource: QuoteDataSource = new MongoDBAtlasQuoteDataSource(quotesDatabase);
    const quoteRepository: QuoteRepository = new QuoteRepositoryImpl(quoteDataSource);

    const quoteRouter = QuoteRouter(
      new CreateQuote(quoteRepository),
      new GetQuoteById(quoteRepository),
      new GetDailyQuote(quoteRepository),
      new GetAllQuotes(quoteRepository),
      new UpdateQuote(quoteRepository),
      new DeleteQuote(quoteRepository)
    );

    const healthRouter = HealthRouter(mongodbQuotesDB);

    server.use("/quotes", quoteRouter);
    server.use("/health", healthRouter);

    server.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  } catch (error) {
    console.error(error);
    mongodbClient.close();
  }
}

run();
