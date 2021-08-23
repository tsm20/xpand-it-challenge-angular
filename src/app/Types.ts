export interface Movie {
    id: string;
    title: string;
    year: number;
    rank: number;
    revenue?: number;
    genre?: string;
    description?: string,
    director?: string,
    actors?: string,
    runtime?: number,
    rating?: number,
    votes?: number,
    metascore?: number,
}

export interface Pagination {
    size: number;
    page: number;
}

export interface Filter {
    start?: number,
    end?: number,
    rank?: number,
    actor?: string,
}
