import { GraphQLClient, gql } from "graphql-request";

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

type ShopifyVariantNode = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: Array<{ name: string; value: string }>;
};

export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  tags: string[];
  productType: string;
  vendor: string;
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariantNode }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
};

type ProductsResponse = {
  products: {
    edges: Array<{ node: ShopifyProductNode }>;
  };
};

type ProductResponse = {
  productByHandle: ShopifyProductNode | null;
};

export type ShopifyCartLineInput = {
  merchandiseId: string;
  quantity: number;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
};

type CartCreateResponse = {
  cartCreate: {
    cart: ShopifyCart | null;
    userErrors: Array<{ field: string[] | null; message: string }>;
  };
};

const getShopifyConfig = () => {
  const domain =
    process.env.SHOPIFY_STORE_DOMAIN ??
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ??
    (process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME
      ? `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_NAME}.myshopify.com`
      : undefined);

  const token =
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
    process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION ??
    process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ??
    "2026-01";

  if (!domain || !token) {
    return null;
  }

  return { domain, token, apiVersion };
};

const createShopifyClient = (): GraphQLClient | null => {
  const config = getShopifyConfig();

  if (!config) {
    return null;
  }

  return new GraphQLClient(
    `https://${config.domain}/api/${config.apiVersion}/graphql.json`,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": config.token,
        "Content-Type": "application/json",
      },
    },
  );
};

export const isShopifyConfigured = (): boolean =>
  createShopifyClient() !== null;

export const getProducts = async (
  first = 24,
): Promise<ShopifyProductNode[]> => {
  const client = createShopifyClient();

  if (!client) {
    return [];
  }

  const query = gql`
    query Products($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            tags
            productType
            vendor
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await client.request<ProductsResponse>(query, { first });
  return response.products.edges.map((edge) => edge.node);
};

export const getProductByHandle = async (
  handle: string,
): Promise<ShopifyProductNode | null> => {
  const client = createShopifyClient();

  if (!client) {
    return null;
  }

  const query = gql`
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        availableForSale
        tags
        productType
        vendor
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              sku
              availableForSale
              quantityAvailable
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await client.request<ProductResponse>(query, { handle });
  return response.productByHandle;
};

export const createCart = async (
  lines: ShopifyCartLineInput[],
): Promise<ShopifyCart> => {
  const client = createShopifyClient();

  if (!client) {
    throw new Error("Shopify Storefront API is not configured.");
  }

  const mutation = gql`
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await client.request<CartCreateResponse>(mutation, {
    input: { lines },
  });
  const error = response.cartCreate.userErrors[0];

  if (error) {
    throw new Error(error.message);
  }

  if (!response.cartCreate.cart) {
    throw new Error("Shopify did not return a cart.");
  }

  return response.cartCreate.cart;
};
