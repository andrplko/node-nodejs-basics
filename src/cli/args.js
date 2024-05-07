import { argv } from 'process';

const parseArgs = () => {
  const formattedArgs = argv
    .slice(2)
    .reduce((acc, cur, index, array) => {
      if (index % 2 === 0) {
        acc.push(`${cur.replace(/-/g, '')} is`);
      } else {
        if (index !== array.length - 1) {
          acc.push(`${cur},`);
        } else {
          acc.push(`${cur}`);
        }
      }
      return acc;
    }, [])
    .join(' ');

  console.log(formattedArgs);
};

parseArgs();
