import { Quote } from "../../../entities/quote_entity";

export interface GetDailyQuoteUseCase {
  execute(): Promise<Quote>;
}
