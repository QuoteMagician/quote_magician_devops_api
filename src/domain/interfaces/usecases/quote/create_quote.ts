import { Quote } from "../../../entities/quote_entity";

export interface CreateQuoteUseCase {
  execute(quote: Quote): Promise<Quote>;
}
