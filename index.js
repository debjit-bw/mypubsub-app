// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Channel } = initSchema(schema);

export {
  Channel
};