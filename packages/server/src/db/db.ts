import { connect } from 'mongoose';

const uri = 'mongodb://localhost:4444';

export async function connectToDb() {
  try {
    await connect(uri, {
      dbName: 'out-of-start',
      auth: { username: 'start-admin', password: 'gott-mos' },
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}
