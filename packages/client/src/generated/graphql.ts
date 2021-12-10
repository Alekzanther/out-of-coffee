import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BaseOrder = {
  __typename: 'BaseOrder';
  _id: Scalars['String'];
  active: Scalars['Boolean'];
  items?: Maybe<Array<Maybe<Item>>>;
};

export type ErrorResponse = {
  __typename: 'ErrorResponse';
  code?: Maybe<Scalars['String']>;
  httpStatusCode?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
};

export type Item = {
  __typename: 'Item';
  _id: Scalars['String'];
  isFavorite?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  productImageUrl?: Maybe<Scalars['String']>;
  productUrl: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  CreateItem: Item;
  CreateOrder: Order;
  SetBaseOrder: BaseOrder;
  SetFavorite: Scalars['Boolean'];
};


export type MutationCreateItemArgs = {
  newItem: NewItem;
};


export type MutationCreateOrderArgs = {
  newOrder: NewOrder;
};


export type MutationSetBaseOrderArgs = {
  newBaseOrder: NewBaseOrder;
};


export type MutationSetFavoriteArgs = {
  id: Scalars['ID'];
};

export type NewBaseOrder = {
  active: Scalars['Boolean'];
  items: Array<Scalars['String']>;
};

export type NewItem = {
  name: Scalars['String'];
  productUrl: Scalars['String'];
};

export type NewOrder = {
  items: Array<Maybe<Scalars['String']>>;
};

export type Order = {
  __typename: 'Order';
  _id: Scalars['String'];
  creationDate: Scalars['Float'];
  endDate: Scalars['Float'];
  items: Array<Item>;
  status: OrderStatus;
};

export enum OrderStatus {
  Delivered = 'DELIVERED',
  Pending = 'PENDING'
}

export type Query = {
  __typename: 'Query';
  GetBaseOrder: BaseOrder;
  GetCurrentOrder: Order;
  GetItem: Item;
  GetItems: Array<Item>;
  GetOrder: Order;
  GetOrders: Array<Order>;
};


export type QueryGetCurrentOrderArgs = {
  id: Scalars['ID'];
};


export type QueryGetItemArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};

export type Response = BaseOrder | ErrorResponse | Item | Order;

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __Directive = {
  __typename: '__Directive';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isRepeatable: Scalars['Boolean'];
  locations: Array<__DirectiveLocation>;
  args: Array<__InputValue>;
};


/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type __DirectiveArgsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export enum __DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION'
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations. */
export type __Schema = {
  __typename: '__Schema';
  description?: Maybe<Scalars['String']>;
  /** A list of all types supported by this server. */
  types: Array<__Type>;
  /** The type that query operations will be rooted at. */
  queryType: __Type;
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<__Type>;
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<__Type>;
  /** A list of all directives supported by this server. */
  directives: Array<__Directive>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByUrl?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: Maybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type GetBaseOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBaseOrderQuery = { __typename: 'Query', GetBaseOrder: { __typename: 'BaseOrder', _id: string, active: boolean, items?: Array<{ __typename: 'Item', _id: string, name: string, productUrl: string, productImageUrl?: string | null | undefined } | null | undefined> | null | undefined } };

export type GetItemQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetItemQuery = { __typename: 'Query', GetItem: { __typename: 'Item', name: string, productUrl: string, productImageUrl?: string | null | undefined, isFavorite?: boolean | null | undefined } };

export type GetItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsQuery = { __typename: 'Query', GetItems: Array<{ __typename: 'Item', _id: string, name: string, productUrl: string, productImageUrl?: string | null | undefined, isFavorite?: boolean | null | undefined }> };

export type ItemFragmentFragment = { __typename: 'Item', _id: string, name: string, productUrl: string, productImageUrl?: string | null | undefined };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename: 'Query', GetOrders: Array<{ __typename: 'Order', _id: string, status: OrderStatus, creationDate: number, endDate: number, items: Array<{ __typename: 'Item', _id: string, name: string, productUrl: string, productImageUrl?: string | null | undefined }> }> };

export type GetSchemaQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchemaQuery = { __typename: 'Query', __schema: { __typename: '__Schema' } };

export const ItemFragmentFragmentDoc = gql`
    fragment ItemFragment on Item {
  _id
  name
  productUrl
  productImageUrl
  __typename
}
    `;
export const GetBaseOrderDocument = gql`
    query getBaseOrder {
  GetBaseOrder {
    _id
    active
    items {
      _id
      name
      productUrl
      productImageUrl
      __typename
    }
  }
}
    `;

/**
 * __useGetBaseOrderQuery__
 *
 * To run a query within a React component, call `useGetBaseOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBaseOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBaseOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBaseOrderQuery(baseOptions?: Apollo.QueryHookOptions<GetBaseOrderQuery, GetBaseOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBaseOrderQuery, GetBaseOrderQueryVariables>(GetBaseOrderDocument, options);
      }
export function useGetBaseOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBaseOrderQuery, GetBaseOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBaseOrderQuery, GetBaseOrderQueryVariables>(GetBaseOrderDocument, options);
        }
export type GetBaseOrderQueryHookResult = ReturnType<typeof useGetBaseOrderQuery>;
export type GetBaseOrderLazyQueryHookResult = ReturnType<typeof useGetBaseOrderLazyQuery>;
export type GetBaseOrderQueryResult = Apollo.QueryResult<GetBaseOrderQuery, GetBaseOrderQueryVariables>;
export const GetItemDocument = gql`
    query getItem($id: ID!) {
  GetItem(id: $id) {
    name
    productUrl
    productImageUrl
    isFavorite
  }
}
    `;

/**
 * __useGetItemQuery__
 *
 * To run a query within a React component, call `useGetItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetItemQuery(baseOptions: Apollo.QueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
      }
export function useGetItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemQuery, GetItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemQuery, GetItemQueryVariables>(GetItemDocument, options);
        }
export type GetItemQueryHookResult = ReturnType<typeof useGetItemQuery>;
export type GetItemLazyQueryHookResult = ReturnType<typeof useGetItemLazyQuery>;
export type GetItemQueryResult = Apollo.QueryResult<GetItemQuery, GetItemQueryVariables>;
export const GetItemsDocument = gql`
    query getItems {
  GetItems {
    _id
    name
    productUrl
    productImageUrl
    isFavorite
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a React component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemsQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
      }
export function useGetItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsQuery, GetItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, options);
        }
export type GetItemsQueryHookResult = ReturnType<typeof useGetItemsQuery>;
export type GetItemsLazyQueryHookResult = ReturnType<typeof useGetItemsLazyQuery>;
export type GetItemsQueryResult = Apollo.QueryResult<GetItemsQuery, GetItemsQueryVariables>;
export const GetOrdersDocument = gql`
    query getOrders {
  GetOrders {
    _id
    status
    items {
      ...ItemFragment
    }
    creationDate
    endDate
    __typename
  }
}
    ${ItemFragmentFragmentDoc}`;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetSchemaDocument = gql`
    query GetSchema {
  __schema {
    __typename
  }
}
    `;

/**
 * __useGetSchemaQuery__
 *
 * To run a query within a React component, call `useGetSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSchemaQuery(baseOptions?: Apollo.QueryHookOptions<GetSchemaQuery, GetSchemaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchemaQuery, GetSchemaQueryVariables>(GetSchemaDocument, options);
      }
export function useGetSchemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchemaQuery, GetSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchemaQuery, GetSchemaQueryVariables>(GetSchemaDocument, options);
        }
export type GetSchemaQueryHookResult = ReturnType<typeof useGetSchemaQuery>;
export type GetSchemaLazyQueryHookResult = ReturnType<typeof useGetSchemaLazyQuery>;
export type GetSchemaQueryResult = Apollo.QueryResult<GetSchemaQuery, GetSchemaQueryVariables>;