import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting";
import {BlogSortField} from "./blog-sort-field";

export type DriverQueryInput = PaginationAndSorting<BlogSortField> &
    Partial<{
        searchDriverNameTerm: string;
        searchDriverEmailTerm: string;
        searchVehicleMakeTerm: string;
    }>;