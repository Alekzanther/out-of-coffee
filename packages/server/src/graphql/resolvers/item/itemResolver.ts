import { isValidObjectId } from 'mongoose';
import { ItemResponse, Resolvers } from '../../../generated/graphql';
import { scrapeProductUrl } from '../../../scraper';
import { Item as ItemModel } from '../../../models/Item/item';

export const itemResolver: Resolvers = {
  Query: {
    GetItems: async (): Promise<ItemResponse> => {
      const items = await ItemModel.find();
      const response: ItemResponse = {
        __typename: 'ItemResponse',
        data: items,
        error: null,
      };
      return response;
    },
    GetItem: async (_, { id }): Promise<ItemResponse> => {
      const isIdValid = isValidObjectId(id);

      if (!isIdValid) {
        const response: ItemResponse = {
          data: null,
          error: {
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
        return response;
      }

      const item = await ItemModel.findById(id);
      if (!item) {
        const response: ItemResponse = {
          data: null,
          error: {
            message: 'No item found with supplied ID.',
          },
        };
        return response;
      }
      const response: ItemResponse = {
        data: [item],
        error: null,
      };
      return response;
    },
  },
  Mutation: {
    CreateItem: async (_, { newItem }): Promise<ItemResponse> => {
      try {
        const productImageUrl = await scrapeProductUrl(
          newItem.productUrl,
        );

        if (!productImageUrl) {
          const response: ItemResponse = {
            data: null,
            error: {
              message:
                'Unable to fetch productImage from supplied product URL',
            },
          };
          return response;
        }
        const item = await ItemModel.create({
          name: newItem?.name,
          productUrl: newItem?.productUrl,
          productImageUrl,
        });

        const response: ItemResponse = {
          data: [item],
          error: null,
        };
        return response;
      } catch (error) {
        const response: ItemResponse = {
          data: null,
          error: {
            message: `Unable to create a new Item: ${error}`,
          },
        };
        return response;
      }
    },
  },
};
