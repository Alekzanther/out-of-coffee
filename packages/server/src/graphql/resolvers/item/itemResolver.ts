import {isValidObjectId} from 'mongoose';
import {ItemResponse, Resolvers} from '../../../generated/graphql';
import {scrapeProductUrl} from '../../../scraper';
import {Item as ItemModel} from '../../../models/Item/item';

export const itemResolver: Resolvers = {
  Query: {
    GetItems: async (): Promise<ItemResponse> => {
      const items = await ItemModel.find();
      return {
        __typename: 'ItemResponse',
        data: items,
        error: null,
      };
    },
    GetItem: async (_, { id }): Promise<ItemResponse> => {
      const isIdValid = isValidObjectId(id);

      if (!isIdValid) {
        return {
          __typename: 'ItemResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'Supplied ID is not a valid MongoDb ObjectId',
          },
        };
      }

      const item = await ItemModel.findById(id);
      if (!item) {
        return {
          __typename: 'ItemResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: 'No item found with supplied ID.',
          },
        };
      }
      return {
        __typename: 'ItemResponse',
        data: [item],
        error: null,
      };
    },
  },
  Mutation: {
    CreateItem: async (_, { newItem }): Promise<ItemResponse> => {
      try {
        const productImageUrl = await scrapeProductUrl(
          newItem.productUrl,
        );

        if (!productImageUrl) {
          return {
            __typename: 'ItemResponse',
            data: null,
            error: {
              __typename: 'ErrorResponse',
              message:
                'Unable to fetch productImage from supplied product URL',
            },
          };
        }
        const item = await ItemModel.create({
          name: newItem?.name,
          productUrl: newItem?.productUrl,
          productImageUrl,
        });

        return {
          __typename: 'ItemResponse',
          data: [item],
          error: null,
        };
      } catch (error) {
        return {
          __typename: 'ItemResponse',
          data: null,
          error: {
            __typename: 'ErrorResponse',
            message: `Unable to create a new Item: ${error}`,
          },
        };
      }
    },
  },
};
