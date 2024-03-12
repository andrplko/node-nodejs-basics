import { env } from 'node:process';

const parseEnv = () => {
  const prefix = 'RSS_';
  const formattedVariables = Object.entries(env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(formattedVariables);
};

parseEnv();
