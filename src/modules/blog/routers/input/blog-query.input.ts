import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting";
import {BlogSortField} from "./blog-sort-field";

export type BlorQueryInput = PaginationAndSorting<BlogSortField> &
    Partial<{
        searchBlogNameTerm: string;
        searchBlogWebsiteUrlTerm: string;
    }>;