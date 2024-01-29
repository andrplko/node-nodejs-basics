import { env } from 'node:process';

const parseEnv = () => {
  const prefix = 'RSS_';
  const filteredVariables = Object.entries(env)
    .filter(([key]) => key.startsWith(prefix));

  const formattedVariables = filteredVariables
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  console.log(formattedVariables);
};

parseEnv();
