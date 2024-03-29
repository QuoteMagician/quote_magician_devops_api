export interface DeleteQuoteUseCase {
  execute(id: string): Promise<boolean>;
}
