import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { redis } from 'utils/redis';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ recomendation: string }>
) {
  const { method, query, body } = req;

  const MAX_AGE = 60_000 * 60;
  const EXPIRY_MS = `PX`;

  if (method === 'POST') {
    const key = `movie/openai/${query.id}`;

    const cachedRecomendation = await redis.get(key);

    if (cachedRecomendation) {
      return res.status(200).json(JSON.parse(cachedRecomendation));
    }

    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Why should I watch ${body.name}?`,
        temperature: 1,
        max_tokens: 4000,
      });

      const recomendation = response.data.choices[0].text?.replaceAll('\n', '');

      console.log(recomendation);

      const recomendationBody = {
        recomendation: recomendation || 'No recomendation available',
      };

      await redis.set(
        key,
        JSON.stringify(recomendationBody),
        EXPIRY_MS,
        MAX_AGE
      );

      return res.status(200).json(recomendationBody);
    } catch {
      return res
        .status(200)
        .json({ recomendation: 'No recomendation available' });
    }
  }
  res.setHeader('Allow', ['GET', 'PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
