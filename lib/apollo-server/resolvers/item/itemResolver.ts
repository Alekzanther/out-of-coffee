import { Resolvers } from '@apollo/client';
import { isValidObjectId } from 'mongoose';

// import { scrapeProductUrl } from '../../../packages/server/lib/scraper';
import { Item as ItemModel } from '../../models/Item/item';

import { Item } from '../../../../apollo-generated/server-graphql';

export const itemResolver: Resolvers = {
  Query: {
    GetItems: async () => {
      const items: Item[] = await ItemModel.find();
      if (items.length === 0) {
        throw new Error('No items found');
      }
      return items;
    },
    GetFavoriteItems: async (): Promise<Item[]> => {
      const items: Item[] = await ItemModel.find({
        isFavorite: true,
      });
      if (items.length === 0) {
        throw new Error('No favorite items found');
      }
      return items;
    },
    GetItem: async (_, { id }): Promise<Item> => {
      const isIdValid = isValidObjectId(id);

      if (!isIdValid) {
        throw new Error(
          'Supplied ID is not a valid MongoDb ObjectId',
        );
      }

      const item = await ItemModel.findById(id);
      if (!item) {
        throw new Error('No item found with supplied ID.');
      }
      return item;
    },
  },
  Mutation: {
    CreateItem: async (_, { newItem }): Promise<Item> => {
      try {
        // const productImageUrl = await scrapeProductUrl(
        //   newItem.productUrl,
        // );

        // if (!productImageUrl) {
        //   throw new Error(
        //     'Unable to fetch productImage from supplied product URL',
        //   );
        // }
        const item = await ItemModel.create({
          name: newItem?.name,
          productUrl: newItem?.productUrl,
          productImageUrl: newItem.productImageUrl || '',
          isFavorite: false,
        });

        return item;
      } catch (error) {
        throw new Error(`Unable to create a new Item: ${error}`);
      }
    },
    // TODO: REMOVE VALUE, CHANGE NAME TO TOGGLE
    SetFavorite: async (_, { id, value }): Promise<Item> => {
      let previousValue;
      if (value !== undefined) {
        previousValue = value;
      } else {
        try {
          const result: Item = await ItemModel.findOne({
            _id: id,
          });
          if (!result) {
            throw new Error('SetFavorite failed: no item found');
          }
          previousValue = result.isFavorite;
        } catch (error) {
          throw new Error(`Unable to find item: ${error}`);
        }
      }
      try {
        const result = await ItemModel.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $set: { isFavorite: !previousValue },
          },
          { new: true },
        );
        if (!result) {
          throw new Error('SetFavorite failed: no item found');
        }
        return result;
      } catch (error) {
        throw new Error(
          `Unable to complete request findOneAndUpdate: ${error}`,
        );
      }
    },
  },
};
