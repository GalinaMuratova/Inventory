export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface CategoryWithoutId {
    name: string;
    description: string;
}

export interface Place {
    id: string;
    name: string;
    description: string;
}

export interface PlaceWithoutId {
    name: string;
    description: string;
}

export interface Item {
    id: string;
    categoryId: string;
    placeId: string;
    name: string;
    description: string;
    image: string |  null;
}

export interface ItemWithoutId {
    categoryId: string;
    placeId: string;
    name: string;
    description: string;
    image: string | null;
}
