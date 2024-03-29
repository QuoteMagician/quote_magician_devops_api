import { Quote } from "../../../entities/quote_entity";

export interface UpdateQuoteUseCase {
  execute(id: string, quote: Quote): Promise<Quote>;
}
