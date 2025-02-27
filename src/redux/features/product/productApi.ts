import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },

      providesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/" + productData.productId,
        method: "PUT",
        body: productData.productInfo,
      }),
      invalidatesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),

    getSingleProducts: builder.query({
      query: (productId) => ({
        url: "/products/" + productId,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    deleteSingleProducts: builder.mutation({
      query: (productId) => ({
        url: "/products/" + productId,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetSingleProductsQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteSingleProductsMutation,
} = authApi;
