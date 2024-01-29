import { env } from 'node:process';

env.RSS_name1 = 'value1';
env.RSS_name2 = 'value2';

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
