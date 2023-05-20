import GPT3Tokenizer from 'gpt3-tokenizer'

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
export const calculateTokens = (text: string) => {
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text)
  return encoded.bpe.length
}
