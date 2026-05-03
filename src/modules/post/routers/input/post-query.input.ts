import {PaginationAndSorting} from "../../../../core/types/pagination-and-sorting";
import {PostSortField} from "../../../post/routers/input/post-sort-field";

export type PostQueryInput = PaginationAndSorting<PostSortField> &
    Partial<{
        searchDriverNameTerm: string;
        searchDriverEmailTerm: string;
        searchVehicleMakeTerm: string;
    }>;