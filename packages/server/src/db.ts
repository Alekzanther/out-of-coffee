import { connect } from 'mongoose';

const uri = 'mongodb://localhost:27017';

export async function connectToDb() {
  try {
    await connect(uri);
  } catch (error) {
    throw error;
  }
}
