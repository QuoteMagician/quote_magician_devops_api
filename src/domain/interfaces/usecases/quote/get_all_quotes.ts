import { Quote } from "../../../entities/quote_entity";

export interface GetAllQuotesUseCase {
  execute(): Promise<Quote[]>;
}
