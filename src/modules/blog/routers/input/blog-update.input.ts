import {ResourceType} from "../../../../core/types/resource-type";
import { BlogAttributes } from '../../application/dtos/blog-attributes';

export type BlogsUpdateInput = {
    data: {
        type: ResourceType.Blogs;
        id: string;
        attributes: BlogAttributes;
    };
};