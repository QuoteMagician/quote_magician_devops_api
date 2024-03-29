import { Quote } from "../../../entities/quote_entity";

export interface GetQuoteByIdUseCase {
  execute(id: string): Promise<Quote>;
}
